import {ExpressionRegistryItem} from "../../../../interfaces/registries/expression-registry-item";
import {ReferenceExpression} from "../../../../interfaces/event";
import {ResolvedRegistry} from "../../resolved-registry";

export const ReferenceExpressionRegistryItem: ExpressionRegistryItem<ReferenceExpression> = {
	evaluate(expression: ReferenceExpression): any {
		return ResolvedRegistry.current.get(expression.targetID);
	}
} as const;