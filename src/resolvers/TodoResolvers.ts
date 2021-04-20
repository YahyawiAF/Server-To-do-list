import {
  Resolver,
  Query,
  Arg,
  Mutation,
  //   ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  InputType,
} from "type-graphql";
import { MyContext } from "../MyContext";
import { isAuth } from "../isAuth";
// import {User} from "../entity/User"
import { ToDo } from "../entity";

@InputType()
export class CreateTodoInput {
  @Field()
  Title: string;
  @Field()
  Description: string;
}

@Resolver()
export class ToDoResolver {
  @Query(() => [ToDo])
  //@UseMiddleware(isAuth)
  async todos(): Promise<any> {
    try {
      console.log("todo", await ToDo.find());
      return ToDo.find();
    } catch (err) {
      console.log("err", err);
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
}
