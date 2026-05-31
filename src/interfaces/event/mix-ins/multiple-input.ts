import {Expression} from "../expressions";
import {Operator} from "../operators";

export interface MultipleInputMixin {
	inputs: (Expression | Operator)[];
}