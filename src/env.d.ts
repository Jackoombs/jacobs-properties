/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SERVER_URL: string;
  readonly PUBLIC_GOOGLE_MAPS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
