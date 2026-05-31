import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {GreaterThanOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const GreaterThanOperatorRegistryItem: OperatorRegistryItem<GreaterThanOperator> = {
	evaluate(operator: GreaterThanOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;