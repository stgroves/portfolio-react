import {ExpressionRegistryItem} from "../../../../interfaces/registries/expression-registry-item";
import {PropertyExpression} from "../../../../interfaces/event";
import {ExpressionRegistry} from "./registry";

export const PropertyExpressionRegistryItem: ExpressionRegistryItem<PropertyExpression> = {
	evaluate(expression: PropertyExpression): any {
		const target: any = ExpressionRegistry.current.get(expression.target.type).evaluate(expression.target);
		return target[expression.field];
	}
} as const;