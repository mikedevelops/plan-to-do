export interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}
