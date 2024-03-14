import { AppRouter } from "./route";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { transformer } from "@/app/server/api/transformer";

const getURL = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getURL()}/api/trpc`,
      transformer,
    }),
  ],
});
