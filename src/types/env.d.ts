/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECORD_REQUESTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
