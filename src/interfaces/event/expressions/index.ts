export * from "./literal";
export * from "./property";
export * from "./function-call";
export * from "./reference";

export interface Expression<TExpressionType extends string = string> {
	type: TExpressionType;
}
