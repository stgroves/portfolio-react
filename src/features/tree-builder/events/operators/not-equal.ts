import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {NotEqualOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const NotEqualOperatorRegistryItem: OperatorRegistryItem<NotEqualOperator> = {
	evaluate(operator: NotEqualOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;