import {Registry} from "../../../../classes/registry";
import {throwInitializationError} from "../../../../classes/registry-manager";
import {RegistryManagementItem, ExpressionRegistryItem} from "../../../../interfaces/registries";
import {LiteralExpressionRegistryItem} from "./literal";
import {PropertyExpressionRegistryItem} from "./property";
import {FunctionCallExpressionRegistryItem} from "./function-call";
import {ReferenceExpressionRegistryItem} from "./reference";
import {ExpressionTypes} from "./types";

let instance: Registry<string, ExpressionRegistryItem<any>> | undefined;

export function isExpression(type: string): boolean {
	return ExpressionRegistry.current.has(type);
}

export const ExpressionRegistry = {
	get current(): Registry<string, ExpressionRegistryItem<any>> {
		if (!instance)
			throwInitializationError("ExpressionRegistry");

		return instance!;
	}
};

export const ExpressionRegistryManagementItem: RegistryManagementItem = {
	initialize: (): Registry<string, ExpressionRegistryItem<any>> => {
		instance = new Registry();

		instance.add(ExpressionTypes.Literal, LiteralExpressionRegistryItem, true);
		instance.add(ExpressionTypes.Property, PropertyExpressionRegistryItem, true);
		instance.add(ExpressionTypes.FunctionCall, FunctionCallExpressionRegistryItem, true);
		instance.add(ExpressionTypes.Reference, ReferenceExpressionRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}