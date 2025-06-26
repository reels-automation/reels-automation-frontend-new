export interface RuntimeConfig {
  API_URL: string;
}

export async function getRuntimeConfig(): Promise<RuntimeConfig> {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error('Failed to load config.json');
  }
  return response.json();
}
