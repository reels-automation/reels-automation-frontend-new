// api.ts
import { getRuntimeConfig } from "@/runtimeConfig";

let cachedApiUrl: string | null = null;

async function getApiUrl(): Promise<string> {
  if (!cachedApiUrl) {
    const config = await getRuntimeConfig();
    cachedApiUrl = config.API_URL;
  }
  return cachedApiUrl;
}

export default getApiUrl;
