import {ExpressionRegistryItem} from "../../../../interfaces/registries/expression-registry-item";
import {LiteralExpression} from "../../../../interfaces/event";

export const LiteralExpressionRegistryItem: ExpressionRegistryItem<LiteralExpression> = {
	evaluate(expression: LiteralExpression): any {
		return expression.value;
	}
} as const;