export const tenants: Array<{ key: string; name: string }> = [
  {
    key: "funkis",
    name: "Studieforbundet Funkis",
  },
  {
    key: "skt",
    name: "Studieforbundet kultur og tradisjon",
  },
];

export function getTenant(key: string | null | undefined) {
  return tenants.find((item) => item.key === key);
}
