/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECORD_REQUESTS: string;
  readonly VITE_OFFLINE: string;
  readonly VITE_OFFLINE_PREFIX: string;
  readonly VITE_OFFLINE_HEADER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
