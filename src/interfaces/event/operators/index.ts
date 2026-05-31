export * from "./and";
export * from "./nand";
export * from "./or";
export * from "./nor";
export * from "./equal";
export * from "./not-equal";
export * from "./xor";
export * from "./xnor";
export * from "./not";
export * from "./greater-than";
export * from "./greater-than-or-equal";
export * from "./less-than";
export * from "./less-than-or-equal";

export interface Operator<T extends string = string> {
	type: T;
}