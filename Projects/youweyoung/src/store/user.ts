import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
  Action,
  Mutation,
} from "vuex-module-decorators";
import store from "./index";
import { mainBus } from "../utils";
interface IUserState {
  uid: string;
  nickname: string;
}

@Module({ dynamic: true, namespaced: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public uid = "";
  public nickname = "";
  public role = 0;
  public token: string = "";
  @Mutation
  public SET_USER(data: any) {
    this.role = data.role;
    this.uid = data.uid;
    this.nickname = data.nickname;
    this.token = data.token;
  }
  @Mutation
  public RESET_USER() {
    this.role = 0;
    this.uid = "";
    this.nickname = "";
    this.token = "";
  }
}
mainBus.on("user-logon", (e) => {
  console.log(e)
  UserModule.SET_USER(e);
});
export const UserModule = getModule(User);
