import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {XorOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const XorOperatorRegistryItem: OperatorRegistryItem<XorOperator> = {
	evaluate(operator: XorOperator): boolean {
		let trueCount = 0;

		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (result)
				trueCount++;
		}

		switch (operator.mode) {
			case "exact":
				return trueCount === 1;

			case "odd":
				return trueCount % 2 === 1;

			default:
				throw new Error(`Invalid XOR mode. Received: ${operator.mode}`);
		}
	}
} as const;