import {StackRegistryItem} from "./stack";
import {RefRegistryItem} from "./ref";
import {Registry} from "../../../classes/registry";
import {LayoutTypes} from "./types";
import {RegistryManagementItem, LayoutRegistryItem} from "../../../interfaces/registries";
import {throwInitializationError} from "../../../classes/registry-manager";

let instance: Registry<string, LayoutRegistryItem<any, any>> | undefined;

export function isLayout(type: string): boolean {
	return LayoutRegistry.current.has(type);
}

export const LayoutRegistry = {
	get current(): Registry<string, LayoutRegistryItem<any, any>> {
		if (!instance)
			throwInitializationError("LayoutRegistry");

		return instance!;
	}
};

export function validateLayoutType(type: string): void {
	if (!isLayout(type))
		throw new Error("Invalid Node type");
}

export const LayoutRegistryManagementItem: RegistryManagementItem = {
	initialize(): Registry<string, LayoutRegistryItem<any, any>> {
		instance = new Registry();

		instance.add(LayoutTypes.Stack, StackRegistryItem, true);
		instance.add(LayoutTypes.Ref, RefRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}