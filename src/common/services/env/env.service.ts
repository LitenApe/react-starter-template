import { Mode } from './mode.constant';

export const Environment = {
  OFFLINE_PREFIX: import.meta.env.VITE_OFFLINE_PREFIX,
  OFFLINE_HEADER: import.meta.env.VITE_OFFLINE_HEADER,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE as Mode,
};
