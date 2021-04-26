import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  Ctx,
  UseMiddleware,
  InputType,
} from "type-graphql";
import { MyContext } from "../MyContext";
import { isAuth } from "../isAuth";
import { getMongoRepository } from "typeorm";
import { ToDo, Comments } from "../entity";

@InputType()
export class CreateTodoInput {
  @Field({ nullable: true })
  Title: string;
  @Field({ nullable: true })
  Description: string;
}

@InputType()
export class CommentToDo {
  @Field()
  idTodo: string;
  @Field()
  comment: string;
}

@Resolver()
export class ToDoResolver {
  @Query(() => [ToDo])
  @UseMiddleware(isAuth)
  async todos(@Ctx() { payload }: MyContext): Promise<any> {
    try {
      return ToDo.find({ Creator: payload!.userEmail });
    } catch (err) {
      throw new Error("Cannot get todos");
    }
  }

  @Query(() => [ToDo])
  async allTodos() {
    try {
      return ToDo.find();
    } catch (err) {
      throw new Error("Cannot get todos");
    }
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async createToDo(
    @Arg("todo") input: CreateTodoInput,
    @Ctx() { payload }: MyContext
  ): Promise<CreateTodoInput> {
    const todo = new ToDo();
    todo.Title = input.Title;
    todo.Description = input.Description;
    todo.IsCompleted = false;
    todo.Creator = payload!.userEmail;
    await todo.save();
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async comment(
    @Arg("idTodo") idTodo: string,
    @Arg("comment") comment: string,
    @Ctx() { payload }: MyContext
  ) {
    const todoRepository = getMongoRepository(ToDo);
    const todo = await todoRepository.findOne(idTodo);
    if (!todo) {
      throw new Error("todo not found");
    }
    todo.comment = [new Comments(comment, payload.userEmail)];
    await todo.save();
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async shareWith(
    @Arg("id") id: string,
    @Arg("userEmail") userEmail: string,
    @Ctx() { payload }: MyContext
  ): Promise<CreateTodoInput> {
    const todoRepository = getMongoRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    if (payload?.userEmail !== todo.Creator) {
      throw new Error("user have no authorization");
    }
    let shared_by = todo.shared_by ? todo.shared_by : [];
    if (shared_by.indexOf(userEmail) !== -1) {
      throw new Error("user already exist !!");
    }
    todo.shared_by = [...shared_by, userEmail];
    await todo.save();
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async updateToDo(
    @Arg("id") id: string,
    @Arg("todo") input: CreateTodoInput,
    @Ctx() { payload }: MyContext
  ): Promise<CreateTodoInput> {
    const todoRepository = getMongoRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    if (payload?.userEmail !== todo.Creator) {
      throw new Error("user have no authorization");
    }
    if (input.Title) todo.Title = input.Title;
    if (input.Description) todo.Description = input.Description;
    await todoRepository.save(todo);
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async updateIsCompleted(
    @Arg("id") id: string,
    @Arg("isCompleted") isCompleted: boolean,
    @Ctx() { payload }: MyContext
  ): Promise<CreateTodoInput> {
    const todoRepository = getMongoRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    if (payload?.userEmail !== todo.Creator) {
      throw new Error("user have no authorization");
    }
    todo.IsCompleted = isCompleted;
    await todoRepository.save(todo);
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async deleteToDo(
    @Arg("id") id: string,
    @Ctx() { payload }: MyContext
  ): Promise<CreateTodoInput> {
    const todoRepository = getMongoRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    if (payload?.userEmail !== todo.Creator) {
      throw new Error("user have no authorization");
    }
    await todoRepository.delete(id);
    return todo;
  }
}
