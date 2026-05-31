import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {LessThanOrEqualOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const LessThanOrEqualOperatorRegistryItem: OperatorRegistryItem<LessThanOrEqualOperator> = {
	evaluate(operator: LessThanOrEqualOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;