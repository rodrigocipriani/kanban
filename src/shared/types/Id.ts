import { v4 as uuid } from "uuid";

export type Id = string;

export function generateId() {
  return uuid();
}
