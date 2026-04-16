export const logger = {
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR]: ${message}`, error);
  },
  info: (message: string) => {
    console.log(`[INFO]: ${message}`);
  },
};