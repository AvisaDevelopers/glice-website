export type BrandScheme = {
  id: string;
  primary: string;
  accent: string;
  surface: string;
  surfaceAlt: string;
  textOnPrimary: string;
  textOnAccent: string;
};

const HUB_SCHEME: BrandScheme = {
  id: "hub",
  primary: "#2563EB",
  accent: "#F59E0B",
  surface: "#EFF6FF",
  surfaceAlt: "#FFFFFF",
  textOnPrimary: "#FFFFFF",
  textOnAccent: "#1E293B",
};

export const BRAND_SCHEMES: Record<string, BrandScheme> = {
  hub: HUB_SCHEME,
  coomeet: {
    id: "coomeet",
    primary: "#FF6B35",
    accent: "#004E89",
    surface: "#FFF5F0",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  y99: {
    id: "y99",
    primary: "#7C3AED",
    accent: "#EC4899",
    surface: "#F5F3FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  chatroulette: {
    id: "chatroulette",
    primary: "#00A651",
    accent: "#FFFFFF",
    surface: "#E8F5E9",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#1E293B",
  },
  bazoocam: {
    id: "bazoocam",
    primary: "#E85D04",
    accent: "#1D3557",
    surface: "#FFF4ED",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  ometv: {
    id: "ometv",
    primary: "#FF5722",
    accent: "#2196F3",
    surface: "#FFF3E0",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  joingy: {
    id: "joingy",
    primary: "#6366F1",
    accent: "#14B8A6",
    surface: "#EEF2FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  emerald: {
    id: "emerald",
    primary: "#10B981",
    accent: "#065F46",
    surface: "#ECFDF5",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  "text-chat": {
    id: "text-chat",
    primary: "#3B82F6",
    accent: "#8B5CF6",
    surface: "#EFF6FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  "random-chat": {
    id: "random-chat",
    primary: "#F43F5E",
    accent: "#FB923C",
    surface: "#FFF1F2",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#1E293B",
  },
  "monkey-run": {
    id: "monkey-run",
    primary: "#A855F7",
    accent: "#FACC15",
    surface: "#FAF5FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#1E293B",
  },
  "chat-avenue": {
    id: "chat-avenue",
    primary: "#0EA5E9",
    accent: "#22C55E",
    surface: "#F0F9FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#FFFFFF",
  },
  "monkey-app": {
    id: "monkey-app",
    primary: "#6B46C1",
    accent: "#FACC15",
    surface: "#F3E8FF",
    surfaceAlt: "#FFFFFF",
    textOnPrimary: "#FFFFFF",
    textOnAccent: "#1E293B",
  },
};

export function getBrandScheme(slug: string): BrandScheme {
  return BRAND_SCHEMES[slug] ?? HUB_SCHEME;
}
