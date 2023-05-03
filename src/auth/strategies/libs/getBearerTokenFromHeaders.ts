import type { Request } from "express";
export const getBearerTokenFromHeaders = (req: Request) => {
  return req.get("authorization")?.replace("Bearer", "").trim();
}

