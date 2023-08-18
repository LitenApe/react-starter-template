export class LocalStorage implements Storage {
  #store: Record<string, string | null> = {};

  setItem = (key: string, item: string | null) => {
    this.#store[key] = item;
  };

  getItem = (key: string) => {
    return this.#store[key];
  };

  removeItem = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.#store[key];
  };

  clear = () => {
    this.#store = {};
  };

  get length() {
    return Object.keys(this.#store).length;
  }

  key = (index: number) => {
    const keys = Object.keys(this.#store);
    return keys[index];
  };
}
