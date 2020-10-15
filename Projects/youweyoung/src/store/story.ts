import { getCharactors } from "@/api";
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
interface IStroyState {
  charactors: any[];
}

@Module({ dynamic: true, namespaced: true, store, name: "story" })
class Story extends VuexModule implements IStroyState {
  charactors = [];
  @MutationAction({ mutate: ["charactors"] })
  updateCharactors() {
    return getCharactors();
  }
}

export const StoryModule = getModule(Story);
