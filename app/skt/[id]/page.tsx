import { fetchStudieplan } from "@/lib/eapply";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "./components/section";
import { Approval } from "./components/approval";
import { Member } from "./components/member";

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params) {
  const studieplan = await fetchStudieplan(params.id, "skt");

  return {
    title: studieplan?.title,
  } as Metadata;
}

export default async function SktStudieplanPage({
  params,
}: {
  params: { id: string };
}) {
  const studieplan = await fetchStudieplan(params.id, "skt");

  if (!studieplan) notFound();

  return (
    <article className="lg:grid lg:space-x-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h1 className="font-semibold text-4xl">{studieplan.title}</h1>
        <ul className="text-gray-600 flex flex-wrap gap-4">
          <li>Godkjent for {studieplan.hours}</li>
          {studieplan.participants && <li>{studieplan.participants}</li>}
          {studieplan.electronicCommunication && (
            <li>{studieplan.electronicCommunication}</li>
          )}
        </ul>
        <section className="prose">
          <Section title="Læringsmål">{studieplan.objectives}</Section>
          <Section title="Målgruppe og ev. krav til forkunnskaper">
            {studieplan.audience}
          </Section>
          <Section title="Innhold">{studieplan.content}</Section>
          <Section title="Læringsressurser (utstyr, bøker, filmer, lenker etc.)">
            {studieplan.resources}
          </Section>
          <Section title="Organisering og arbeidsmåter">
            {studieplan.activities}
          </Section>
          <Section title="Krav til lærer/instruktør">
            {studieplan.teacherRequirements}
          </Section>
          <Section title="Avsluttende prøve/eksamen">
            {studieplan.assessment}
          </Section>
          <Section title="Utfyllende opplysninger">
            {studieplan.otherInformation}
          </Section>
          <Section
            title="Studieplanen kan knyttes opp mot følgende mål i
            voksenopplæringsloven"
          >
            {studieplan.mainObjectives}
          </Section>
        </section>
      </div>
      <aside className="max-w-prose">
        <Member>{studieplan.memberName}</Member>
        <Approval
          approvedBy={studieplan.approvedByName}
          code={studieplan.code}
          date={new Date(studieplan.approved!)}
          tenantName={studieplan.tenantName}
        />
      </aside>
    </article>
  );
}
