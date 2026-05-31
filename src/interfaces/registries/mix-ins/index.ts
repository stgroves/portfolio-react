import {OrderMixin} from "./order";
import {EqualMixin} from "./equal";

export * from "./equal";
export * from "./order";

export interface EqualOrderMixin<TType> extends OrderMixin<TType>, EqualMixin<TType> {}