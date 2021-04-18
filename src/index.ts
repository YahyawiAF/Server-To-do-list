import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
// import { ToDo } from "./entity/ToDo";
import { UserResolver } from "./UserResolver";
import { buildSchema } from "type-graphql";

(async () => {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"));
  await createConnection();
  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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
