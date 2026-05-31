import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {AndOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const AndOperatorRegistryItem: OperatorRegistryItem<AndOperator> = {
	evaluate(operator: AndOperator): boolean {
		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (!result)
				return false;
		}

		return true;
	}
} as const;