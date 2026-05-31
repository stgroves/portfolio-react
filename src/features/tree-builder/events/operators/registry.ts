import {Registry} from "../../../../classes/registry";
import {OperatorTypes} from "./types";
import {throwInitializationError} from "../../../../classes/registry-manager";
import {RegistryManagementItem, OperatorRegistryItem} from "../../../../interfaces/registries";
import {
	AndOperatorRegistryItem, NandOperatorRegistryItem,
	EqualOperatorRegistryItem, NotEqualOperatorRegistryItem,
	GreaterThanOperatorRegistryItem, LessThanOperatorRegistryItem,
	GreaterThanOrEqualOperatorRegistryItem, LessThanOrEqualOperatorRegistryItem,
	OrOperatorRegistryItem, NorOperatorRegistryItem,
	XorOperatorRegistryItem, XnorOperatorRegistryItem
} from "./index-gates";

let instance: Registry<string, OperatorRegistryItem<any>> | undefined;

export function isOperator(type: string): boolean {
	return OperatorRegistry.current.has(type);
}

export const OperatorRegistry = {
	get current(): Registry<string, OperatorRegistryItem<any>> {
		if (!instance)
			throwInitializationError("LogicGateRegistry");

		return instance!;
	}
};

export const OperatorRegistryManagementItem: RegistryManagementItem = {
	initialize: (): Registry<string, OperatorRegistryItem<any>> => {
		instance = new Registry();

		instance.add(OperatorTypes.And, AndOperatorRegistryItem, true);
		instance.add(OperatorTypes.Equal, EqualOperatorRegistryItem, true);
		instance.add(OperatorTypes.GreaterThan, GreaterThanOperatorRegistryItem, true);
		instance.add(OperatorTypes.GreaterThanOrEqual, GreaterThanOrEqualOperatorRegistryItem, true);
		instance.add(OperatorTypes.LessThan, LessThanOperatorRegistryItem, true);
		instance.add(OperatorTypes.LessThanOrEqual, LessThanOrEqualOperatorRegistryItem, true);
		instance.add(OperatorTypes.Nand, NandOperatorRegistryItem, true);
		instance.add(OperatorTypes.Nor, NorOperatorRegistryItem, true);
		instance.add(OperatorTypes.NotEqual, NotEqualOperatorRegistryItem, true);
		instance.add(OperatorTypes.Or, OrOperatorRegistryItem, true);
		instance.add(OperatorTypes.Xnor, XnorOperatorRegistryItem, true);
		instance.add(OperatorTypes.Xor, XorOperatorRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}