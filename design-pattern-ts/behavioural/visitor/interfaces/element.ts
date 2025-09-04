import { ProductVisitor } from './visitor';

export interface ProductElement {
  accept(visitor: ProductVisitor): void;
  readonly price: number;
}
