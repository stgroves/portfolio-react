import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {NotOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const NotOperatorRegistryItem: OperatorRegistryItem<NotOperator> = {
	evaluate(operator: NotOperator): boolean {
		const result = evaluateInput(operator.input);

		validateValue(result);

		return !result;
	}
} as const;