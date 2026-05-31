import {Expression} from "../expressions";
import {Operator} from "../operators";

export interface BaseInputMixin {
	inputA: Expression | Operator;
	inputB: Expression | Operator;
}