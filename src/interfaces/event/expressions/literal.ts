import {Expression} from "./index";
import {ExpressionTypes} from "../../../features/tree-builder";

export interface LiteralExpression extends Expression<typeof ExpressionTypes.Literal> {
	value: any;
}