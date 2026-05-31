import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {NorOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const NorOperatorRegistryItem: OperatorRegistryItem<NorOperator> = {
	evaluate(operator: NorOperator): boolean {
		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (result)
				return false;
		}

		return true;
	}
} as const;