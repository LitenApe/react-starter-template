export const Environment = {
  RECORD: import.meta.env.VITE_RECORD_REQUESTS === 'true',
  OFFLINE: import.meta.env.VITE_OFFLINE === 'true',
  OFFLINE_PREFIX: import.meta.env.VITE_OFFLINE_PREFIX,
  OFFLINE_HEADER: import.meta.env.VITE_OFFLINE_HEADER,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
};
