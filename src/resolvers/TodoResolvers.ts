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
import { getRepository } from "typeorm";
import { ToDo } from "../entity";

@InputType()
export class CreateTodoInput {
  @Field({ nullable: true })
  Title: string;
  @Field({ nullable: true })
  Description: string;
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
  async updateToDo(
    @Arg("id") id: string,
    @Arg("todo") input: CreateTodoInput
  ): Promise<CreateTodoInput> {
    const todoRepository = getRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    if (input.Title) todo.Title = input.Title;
    if (input.Description) todo.Description = input.Description;
    await todoRepository.save(todo);
    return todo;
  }

  @Mutation(() => ToDo)
  @UseMiddleware(isAuth)
  async deleteToDo(@Arg("id") id: string): Promise<CreateTodoInput> {
    const todoRepository = getRepository(ToDo);
    const todo = await todoRepository.findOne(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    const c = await todoRepository.delete(id);
    console.log("c", c);
    return todo;
  }
}
