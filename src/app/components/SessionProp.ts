import { Session } from "next-auth";

export interface SessionProp {
    session: Session | null;
  }