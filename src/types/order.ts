import { Item } from ".";

export type Order = {
  username: string;
  stage: "choosing" | "payMethod" | "adress" | "finish";
  orderlist: Array<Item>;
  checked: boolean;
};
