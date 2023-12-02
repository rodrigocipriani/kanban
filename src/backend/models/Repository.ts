export default class Repository<T> {
  protected client: T;

  constructor({ client }: { client: T }) {
    this.client = client;
  }
}
