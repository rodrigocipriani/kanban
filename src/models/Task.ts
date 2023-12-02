import { Id } from "../types/Id";

type Props = {
  id: Id;
  title: string;
  order?: number;
  content?: string;
  columnId: Id;
};

export default class Task {
  readonly id: Id;
  readonly title: string;
  readonly order: number;
  readonly content?: string;
  readonly columnId: Id;

  constructor({ id, title, order, content, columnId }: Props) {
    this.id = id;
    this.title = title;
    this.order = order || 9999;
    this.content = content;
    this.columnId = columnId;
  }
}
