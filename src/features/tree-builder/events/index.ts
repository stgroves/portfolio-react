import {Expression} from "../../../interfaces/event";
import {Operator} from "../../../interfaces/event/operators";
import {ExpressionRegistry, isExpression} from "./expressions";
import {OperatorRegistry} from "./operators";

export * from "./operators"
export * from "./actions";
export * from "./expressions";
export * from "./comparable";

export function evaluateInput(input: Expression | Operator): any {
	return isExpression(input.type) ?
		ExpressionRegistry.current.get(input.type).evaluate(input) :
		OperatorRegistry.current.get(input.type).evaluate(input);
}