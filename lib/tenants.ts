export const tenants: Array<{ key: string; name: string; header: string }> = [
  {
    key: "skt",
    name: "Studieforbundet kultur og tradisjon",
    header: "bg-fuchsia-700 text-white",
  },
];

export function getTenant(key: string | null | undefined) {
  return tenants.find((item) => item.key === key);
}
