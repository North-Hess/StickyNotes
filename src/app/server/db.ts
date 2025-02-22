import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const prismaClientSingleton = () => {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}` ?? "",
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });
  const adapter = new PrismaLibSQL(libsql);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
