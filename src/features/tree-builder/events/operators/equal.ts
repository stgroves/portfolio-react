import {OperatorRegistryItem} from "../../../../interfaces/registries";
import {EqualOperator} from "../../../../interfaces/event/operators";
import {evaluateComparableOperator} from "./index";

export const EqualOperatorRegistryItem: OperatorRegistryItem<EqualOperator> = {
	evaluate(operator: EqualOperator): boolean {
		return evaluateComparableOperator(operator);
	}
} as const;