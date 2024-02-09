const dateFormat = new Intl.DateTimeFormat("nb-NO", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface SectionProps {
  approvedBy?: string;
  code: string;
  date: Date;
  tenantName: string;
}

export function Approval({ approvedBy, code, date, tenantName }: SectionProps) {
  return (
    <section className="not-prose text-sm p-4 print:px-0 space-y-2 bg-secondary text-secondary-foreground/80">
      <p>Studieplanen er godkjent for bruk i {tenantName}</p>
      <p className="font-semibold">
        Studieplannummer {code} oppgis når studieplanen benyttes
      </p>
      <p>
        Godkjent {dateFormat.format(date)}
        {approvedBy && ` av ${approvedBy}`}
      </p>
    </section>
  );
}
