import {Expression} from "../event";

export interface ExpressionRegistryItem<TExpression extends Expression> {
	evaluate: (expression: TExpression) => any;
}