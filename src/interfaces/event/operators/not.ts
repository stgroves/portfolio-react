import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {Expression} from "../expressions";

export interface NotOperator extends Operator<typeof OperatorTypes.Not> {
	input: Expression | Operator;
}