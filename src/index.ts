import "reflect-metadata";
// import { createConnection } from "typeorm";
import express from "express";
// import { ToDo } from "./entity/ToDo";

(async () => {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"))
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
//     await connection.manager.save(std);
//     console.log("Saved a new user with id: " + std.id);

//     console.log("Loading ToDo List from the database...");
//     const todos = await connection.manager.find(ToDo);
//     console.log("Loaded ToDoList: ", todos);

//     console.log("TypeORM with MongoDB");
//   })
//   .catch((error) => console.log(error));
