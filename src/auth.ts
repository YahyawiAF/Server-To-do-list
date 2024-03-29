import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userEmail: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userEmail: user.email }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
