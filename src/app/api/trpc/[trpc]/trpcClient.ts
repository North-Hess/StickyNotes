import { AppRouter } from "./route";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { transformer } from "@/app/server/api/transformer";

const getURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
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
