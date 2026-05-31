import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {OrOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const OrOperatorRegistryItem: OperatorRegistryItem<OrOperator> = {
	evaluate(operator: OrOperator): boolean {
		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (result)
				return true;
		}

		return false;
	}
} as const;