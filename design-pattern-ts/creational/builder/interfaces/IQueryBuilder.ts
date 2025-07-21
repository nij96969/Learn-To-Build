export interface IQueryBuilder {
  build(): { query: string, values: (string | number)[] };
}