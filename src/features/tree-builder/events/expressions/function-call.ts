import {ExpressionRegistryItem} from "../../../../interfaces/registries/expression-registry-item";
import {Expression, FunctionCallExpression} from "../../../../interfaces/event";
import {ExpressionRegistry} from "./registry";

export const FunctionCallExpressionRegistryItem: ExpressionRegistryItem<FunctionCallExpression> = {
	evaluate(expression: FunctionCallExpression): any {
		const target: any = ExpressionRegistry.current.get(expression.target.type).evaluate(expression.target);
		const args: any[] | undefined = expression.args?.map((arg: Expression): any =>
			ExpressionRegistry.current.get(arg.type).evaluate(arg)
		);
		return target[expression.method]?.(args);
	}
} as const;