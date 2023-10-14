export interface Subscribable<T> {
  subscribe: (callback: (value: T) => void) => void;
  unsubscribe: (callback: (value: T) => void) => void;
}
