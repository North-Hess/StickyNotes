import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAuth = () => {
  return getServerSession(authOptions);
};
