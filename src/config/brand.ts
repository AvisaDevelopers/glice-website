export const brandConfig = {
  name: "Glice",
  company: "Glice Labs",
  fullName: "Glice Web",
  tagline: "Connect through video",
  welcomeMessage: "Glice — video chat and messaging",
  storagePrefix: "glice_web",
} as const;

export type BrandConfig = typeof brandConfig;

export function getStorageKey(key: string): string {
  return `${brandConfig.storagePrefix}_${key}`;
}
