// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // neon databse url
      DATABASE_URL: string;

      // uploading api key and app id
      UPLOADTHING_SECRET: string;
      UPLOADTHING_APP_ID: string;
    }
  }
}
