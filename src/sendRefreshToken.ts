import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("quid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
