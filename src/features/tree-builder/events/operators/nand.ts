import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {NandOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const NandOperatorRegistryItem: OperatorRegistryItem<NandOperator> = {
	evaluate(operator: NandOperator): boolean {
		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (!result)
				return true;
		}

		return false;
	}
} as const;