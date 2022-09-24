import {Article} from "./Article";

export interface Order {
  id : number;
  reference : string;
  date : string;
  articles : Article[];
}
