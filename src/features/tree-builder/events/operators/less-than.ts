import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {LessThanOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const LessThanOperatorRegistryItem: OperatorRegistryItem<LessThanOperator> = {
	evaluate(operator: LessThanOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;