import {Expression} from "./index";
import {ExpressionTypes} from "../../../features/tree-builder";

export interface FunctionCallExpression extends Expression<typeof ExpressionTypes.FunctionCall> {
	target: Expression;
	method: string;
	args?: Expression[];
}