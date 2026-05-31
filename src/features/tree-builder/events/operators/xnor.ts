import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {XnorOperator} from "../../../../interfaces/event/operators";
import {evaluateInput, validateValue} from "../index";

export const XnorOperatorRegistryItem: OperatorRegistryItem<XnorOperator> = {
	evaluate(operator: XnorOperator): boolean {
		let falseCount = 0;

		for (const input of operator.inputs) {
			const result = evaluateInput(input);

			validateValue(result);

			if (!result)
				falseCount++;
		}

		switch (operator.mode) {
			case "exact":
				return falseCount === 1;

			case "odd":
				return falseCount % 2 === 1;

			default:
				throw new Error(`Invalid XNOR mode. Received: ${operator.mode}`);
		}
	}
} as const;