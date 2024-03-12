import Markdown from "react-markdown";
import { Subheader } from "./subheader";

interface SectionProps {
  title: string;
  children?: string;
}

export function Section({ title, children }: SectionProps) {
  if (!children) return null;

  return (
    <section>
      <Subheader>{title}</Subheader>
      <Markdown>{children}</Markdown>
    </section>
  );
}
