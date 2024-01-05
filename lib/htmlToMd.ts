import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

function cleanHtml(str: string) {
  return str.replace(/&nbsp;/gm, " ").replace(/<p>\s*<\/p>/gm, "");
}

export function htmlToMd(rawHtml?: string) {
  if (!rawHtml) return undefined;

  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(cleanHtml(rawHtml))
    .then(String)
    .then((str) => str.replace(/^\\-\s+/gm, "* "));
}
export function htmlsToMdSync(...rawHtml: Array<string | undefined>) {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(cleanHtml(rawHtml.filter(Boolean).join("\n\n")))
    .toString()
    .replace(/^[\*-\/\\]+/gm, "")
    .replace(/\\$/gm, "");
}
