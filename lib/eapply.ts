import { notFound } from "next/navigation";
import { htmlToMd, htmlsToMdSync } from "./htmlToMd";
import { IndexedStudieplan } from "./search";

function eApplyGetRequest(url: string) {
  const req = new Request([process.env.EAPPLY_API_URL, url].join("/"));
  req.headers.set(
    "Authorization",
    "Basic " +
      Buffer.from(
        [
          process.env.EAPPLY_READ_USER_ID,
          process.env.EAPPLY_READ_USER_SECRET,
        ].join(":")
      ).toString("base64")
  );

  return req;
}

const TENANTS: Record<string, string> = {
  skt: "73E12C2A-64A4-4EAC-A80A-898F3F3BFEF3",
};

interface Named {
  name: string;
}

interface EapplyRawStudieplan {
  activities: Named[];
  approved?: string;
  approvedByName?: string;
  assessment?: string;
  audience?: string;
  code: string;
  content?: string;
  electronicCommunicationMax?: number;
  electronicCommunicationMin?: number;
  hoursMax?: number;
  hoursMin?: number;
  id: string;
  mainObjectives: Named[];
  memberName?: string;
  objectives?: string;
  organisation: Named[];
  otherActivities?: string;
  otherInformation?: string;
  otherResources?: string;
  otherTeacherRequirements?: string;
  participantsMin?: number;
  participantsMax?: number;
  publicPlan: boolean;
  resources: Named[];
  status: string;
  subjects: Named[];
  teacherRequired: boolean;
  teacherRequirements: Named[];
  tenantId: string;
  tenantName: string;
  title: string;
  versionNumber: number;
}

function namedToList(items: Named[], other?: string) {
  return [...items.map((i) => `* ${i.name}`), other].filter(Boolean).join("\n");
}

function namedToHtmlList(items: Named[]) {
  if (!items.length) return undefined;

  return `<ul>${items.map((i) => `<li>${i.name}</li>`).join("")}</ul>`;
}

function openRangeToString(
  range: { min?: number; max?: number },
  label: string
) {
  if (range.min) {
    return range.max
      ? `${range.min}–${range.max} ${label}`
      : `minst ${range.min} ${label}`;
  }
  if (range.max) {
    return `inntil ${range.max} ${label}`;
  }

  return undefined;
}

async function cleanStudieplan(data: EapplyRawStudieplan) {
  const {
    approved,
    approvedByName,
    code,
    id,
    memberName,
    publicPlan,
    status,
    tenantId,
    tenantName,
    title,
    versionNumber,
  } = data;

  const [
    audience,
    assessment,
    content,
    objectives,
    otherActivities,
    otherInformation,
    otherResources,
    otherTeacherRequirements,
  ] = await Promise.all([
    htmlToMd(data.audience),
    htmlToMd(data.assessment),
    htmlToMd(data.content),
    htmlToMd(data.objectives),
    htmlToMd(data.otherActivities),
    htmlToMd(data.otherInformation),
    htmlToMd(data.otherResources),
    htmlToMd(data.otherTeacherRequirements),
  ]);

  return {
    activities: namedToList(data.activities, otherActivities),
    approved,
    approvedByName,
    assessment,
    audience,
    code,
    content,
    electronicCommunication: openRangeToString(
      {
        min: data.electronicCommunicationMin,
        max: data.electronicCommunicationMax,
      },
      "% elektronisk kommunikasjon"
    ),
    hours:
      data.hoursMin && data.hoursMin < (data.hoursMax || 0)
        ? `${data.hoursMin}–${data.hoursMax} timer`
        : `${data.hoursMin || data.hoursMax} timer`,
    id,
    mainObjectives: namedToList(data.mainObjectives),
    memberName,
    objectives,
    organisation: namedToList(data.organisation),
    otherInformation,
    participants: openRangeToString(
      { min: data.participantsMin, max: data.participantsMax },
      "deltakere"
    ),
    publicPlan,
    resources: namedToList(data.resources, otherResources),
    status,
    subjects: data.subjects.map((i) => i.name),
    teacherRequirements: namedToList(
      data.teacherRequirements,
      otherTeacherRequirements
    ),
    tenantId,
    tenantName,
    title,
    versionNumber,
  };
}

export async function fetchStudieplan(id: string, tenant: string) {
  if (tenant in TENANTS) {
    const response = await fetch(
      eApplyGetRequest(`courseplans/${id}?tenantId=${TENANTS[tenant]}`)
    );
    if (!response.ok) notFound();

    const data = (await response.json()) as EapplyRawStudieplan;

    return await cleanStudieplan(data);
  }

  throw "Unknown tenant";
}

export async function fetchStudieplansForIndex(
  tenant: string
): Promise<IndexedStudieplan[]> {
  if (tenant in TENANTS) {
    let result: EapplyRawStudieplan[] = [];
    let offset = 0;
    const limit = 200;

    while (offset < 1_000_000) {
      const response = await fetch(
        eApplyGetRequest(
          `courseplans?tenantId=${TENANTS[tenant]}&limit=${limit}&offset=${offset}`
        )
      );

      if (!response.ok) throw response.statusText;

      const data = (await response.json()) as EapplyRawStudieplan[];

      result.push(...data);

      if (data.length < limit) break;

      offset += limit;
    }

    const version = new Date().getTime();

    return result
      .filter((item) => item.status === "Approved")
      .map((item) => ({
        digital: !!(
          item.electronicCommunicationMin || item.electronicCommunicationMax
        ),
        godkjent: new Date(item.approved!).getTime(),
        innhold: htmlsToMdSync(
          item.objectives,
          item.audience,
          item.content,
          namedToHtmlList(item.resources),
          item.otherResources,
          namedToHtmlList(item.activities),
          item.otherActivities,
          namedToHtmlList(item.activities),
          item.otherActivities,
          namedToHtmlList(item.teacherRequirements),
          item.otherTeacherRequirements,
          item.assessment,
          item.otherInformation,
          namedToHtmlList(item.mainObjectives)
        ),
        kategorier: item.subjects.map((i) => i.name),
        nr: item.code,
        objectID: item.id,
        org: item.memberName,
        sf: tenant,
        timer_max: item.hoursMax,
        timer_min: item.hoursMin,
        tittel: item.title,
        version,
      }));
  }

  throw "Unknown tenant";
}
