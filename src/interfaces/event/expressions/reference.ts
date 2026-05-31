import {Expression} from "./index";
import {ExpressionTypes} from "../../../features/tree-builder";

export interface ReferenceExpression extends Expression<typeof ExpressionTypes.Reference> {
	targetID: string;
}