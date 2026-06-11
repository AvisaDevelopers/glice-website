"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatRouteEffect } from "@/components/site/chat-route-effect";
import { SiteEffects } from "@/components/site/site-effects";
import { UiSessionProvider } from "@/components/site/ui-session-provider";
import { ChatSocketInitializer } from "@/features/chat/hooks/use-chat-init";
import type { GliceUser } from "@/features/auth/types";
import { GoogleAuthProvider } from "@/providers/google-auth-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: GliceUser | null;
}): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAuthProvider>
        <UiSessionProvider initialUser={initialUser}>
          <ChatSocketInitializer />
          <ChatRouteEffect />
          <SiteEffects />
          {children}
        </UiSessionProvider>
      </GoogleAuthProvider>
    </QueryClientProvider>
  );
}


