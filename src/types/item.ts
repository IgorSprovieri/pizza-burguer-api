import { Section } from ".";

export type Item = {
  itemid: number;
  sectionid: number;
  title: string;
  iconurl: string;
  inverticonurl: string;
  name: string;
  price: string;
  imageurl: string;
  description: string;
  quantity?: number;
};
