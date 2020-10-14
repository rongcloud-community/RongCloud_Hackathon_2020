import {
  Module,
  VuexModule,
  getModule,
  MutationAction,
  Action,
  Mutation,
} from "vuex-module-decorators";
import store from "./index";
import { mainBus, SimDB } from "../utils";
interface IUserState {
  uid: string;
  nickname: string;
  role: number;
  avatar: string;
  token: string;
}
const avatarPath = "./static/resources/images/avatar/"
const db = new SimDB();
@Module({ dynamic: true, namespaced: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public uid = "";
  public nickname = "";
  public role = 0;
  public token: string = "";
  public avatar: string = '0.jpg'
  public get hasLogon() {
    return this.role > 0
  }
  public get avatarPath() {
    return avatarPath + this.avatar
  }
  @Mutation
  public SET_USER(data: any) {
    this.role = data.role;
    this.uid = data.uid;
    this.nickname = data.nickname;
    this.token = data.token;
    this.avatar = data.avatar
    db.set('user', data)
    const user = db.get("user");
  }
  @Mutation
  public RESET_USER() {
    this.role = 0;
    this.uid = "";
    this.nickname = "";
    this.token = "";
    this.avatar = '0.jpg'
    db.del('user')
  }
  @Action
  public logout() {
    this.RESET_USER()
    mainBus.emit('user-logout')
  }
  @Action
  public init() {
    const user = db.get("user");
    if (user) {
      UserModule.SET_USER(user);
    }
  }
}
mainBus.on("user-logon", (e) => {
  console.log(e)
  UserModule.SET_USER(e);
});
mainBus.on("force-logout", (e) => {
  UserModule.logout();
});
export const UserModule = getModule(User);
