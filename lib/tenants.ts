export const tenants: Array<{ key: string; name: string }> = [
  {
    key: "skt",
    name: "Studieforbundet kultur og tradisjon",
  },
];

export function getTenant(key: string | null | undefined) {
  return tenants.find((item) => item.key === key);
}
