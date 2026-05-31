import {Expression} from "./index";
import {ExpressionTypes} from "../../../features/tree-builder";

export interface PropertyExpression extends Expression<typeof ExpressionTypes.Property> {
	target: Expression;
	field: string;
}