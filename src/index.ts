import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver, ToDoResolver } from "./resolvers";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("hello"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  await createConnection();
  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ToDoResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  appoloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("express server started");
  });
})();

// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new ToDo into the database...");
//     const std = new ToDo();
//     std.Title = "ToDo 1";
//     std.Description = "Clean the house";
//     std.Email = "qsd@qsd.fr"
//     await connection.manager.save(std);
//     console.log("Saved a new user with id: " + std.id);

//     console.log("Loading ToDo List from the database...");
//     const todos = await connection.manager.find(ToDo);
//     console.log("Loaded ToDoList: ", todos);

//     console.log("TypeORM with MongoDB");
//   })
//   .catch((error) => console.log(error));
