import { authRoutes } from "@/features/auth/api/routes";
import { getClientIp } from "@/features/auth/lib/get-client-ip";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import type { AuthResponse, GliceUser } from "@/features/auth/types";
import { apiClient } from "@/lib/api-client";

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const ipAddress = await getClientIp();
  const response = await apiClient.post<AuthResponse>(
    authRoutes.login,
    { email, password, ipAddress },
    false,
  );
  tokenStorage.setSession(
    response.accessToken,
    response.refreshToken,
    response.user.email,
  );
  return response;
}

export async function signupWithEmail(input: {
  email: string;
  password: string;
  name?: string;
  refCode?: string;
}): Promise<AuthResponse> {
  const ipAddress = await getClientIp();
  const response = await apiClient.post<AuthResponse>(
    authRoutes.signup,
    {
      email: input.email,
      password: input.password,
      ipAddress,
      provider: "custom",
      refCode: input.refCode ?? "",
      ...(input.name ? { name: input.name } : {}),
    },
    false,
  );
  tokenStorage.setSession(
    response.accessToken,
    response.refreshToken,
    response.user.email,
  );
  return response;
}

export async function sendOtp(
  email: string,
  method: "verify" | "reset" = "verify",
): Promise<string> {
  return apiClient.post<string>(
    authRoutes.sendOtp,
    { email, method },
    false,
  );
}

export async function verifyOtp(email: string, otp: string): Promise<string> {
  return apiClient.post<string>(
    authRoutes.verifyOtp,
    { email, otp },
    false,
  );
}

export async function updatePassword(input: {
  email: string;
  password: string;
  oldPassword?: string | null;
}): Promise<string> {
  return apiClient.post<string>(
    authRoutes.updatePassword,
    {
      email: input.email,
      password: input.password,
      oldPassword: input.oldPassword ?? null,
    },
    false,
  );
}

export async function getUser(identifier: string): Promise<GliceUser> {
  return apiClient.get<GliceUser>(authRoutes.getUser(identifier));
}
