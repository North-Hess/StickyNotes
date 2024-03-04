import { AppRouter } from "./route";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { transformer } from "@/app/server/api/transformer";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      transformer,
    }),
  ],
});
