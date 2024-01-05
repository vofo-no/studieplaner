import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberProps {
  children?: string;
}

const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

const getColorFromName = (name: string) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, 40, 60);
  const l = normalizeHash(hash, 40, 60);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export function Member({ children }: MemberProps) {
  if (!children) return null;
  return (
    <div className="flex gap-2 items-center my-4 font-bold leading-5">
      <Avatar className="print:hidden">
        <AvatarFallback
          style={{ backgroundColor: getColorFromName(children) }}
          className="text-background"
        >
          {children
            .toUpperCase()
            .split(" ")
            .filter((n) => !["OG", "AV", "I", "PÅ"].includes(n))
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>{" "}
      {children}
    </div>
  );
}
