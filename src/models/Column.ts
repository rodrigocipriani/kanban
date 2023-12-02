import { Id } from "../types/Id";

type Props = {
  id: Id;
  title: string;
  order?: number;
};

export default class Column {
  readonly id: Id;
  readonly title: string;
  readonly order: number;

  constructor({ id, title, order }: Props) {
    this.id = id;
    this.title = title;
    this.order = order || 9999;
  }
}
