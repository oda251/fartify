export interface IRepository<T> {
  get: () => Promise<T> | T;
  set: (value: T) => Promise<void> | void;
}
export interface AppRepository {
  [key: string]: IRepository<T>;
}
