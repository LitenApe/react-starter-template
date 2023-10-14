export class RecordsService<R> {
  #entries: Record<string, R> = {};

  addEntry = (key: string, payload: R) => {
    this.#entries[key] = payload;
  };

  getEntry = (key: string) => {
    return this.#entries[key];
  };

  getRecords = () => {
    return this.#entries;
  };

  clear = () => {
    this.#entries = {};
  };
}
