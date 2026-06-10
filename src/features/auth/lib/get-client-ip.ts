let cachedIp: string | null = null;

export async function getClientIp(): Promise<string> {
  if (cachedIp) return cachedIp;

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return "";
    const data = (await response.json()) as { ip?: string };
    cachedIp = data.ip ?? "";
    return cachedIp;
  } catch {
    return "";
  }
}
