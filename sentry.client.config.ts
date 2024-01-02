import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://18eb32c129987a7f861412444bd8fa3a@o4505120852606976.ingest.sentry.io/4506502543966208",
  tracesSampleRate: 0.01,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,
});
