import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {GreaterThanOrEqualOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const GreaterThanOrEqualOperatorRegistryItem: OperatorRegistryItem<GreaterThanOrEqualOperator> = {
	evaluate(operator: GreaterThanOrEqualOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;