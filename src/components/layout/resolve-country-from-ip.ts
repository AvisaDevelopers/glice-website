export type ResolvedCountry = {
  code: string;
  name: string;
};

const cache = new Map<string, ResolvedCountry | null>();

export async function resolveCountryFromIp(
  ip: string,
): Promise<ResolvedCountry | null> {
  const trimmed = ip.trim();
  if (!trimmed) return null;

  if (cache.has(trimmed)) {
    return cache.get(trimmed) ?? null;
  }

  try {
    const response = await fetch(
      `https://ipapi.co/${encodeURIComponent(trimmed)}/json/`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) {
      cache.set(trimmed, null);
      return null;
    }

    const data = (await response.json()) as {
      country_code?: string;
      country_name?: string;
      error?: boolean;
    };

    if (data.error || !data.country_code?.trim()) {
      cache.set(trimmed, null);
      return null;
    }

    const resolved: ResolvedCountry = {
      code: data.country_code.trim().toUpperCase(),
      name: data.country_name?.trim() || data.country_code.trim().toUpperCase(),
    };
    cache.set(trimmed, resolved);
    return resolved;
  } catch {
    cache.set(trimmed, null);
    return null;
  }
}
