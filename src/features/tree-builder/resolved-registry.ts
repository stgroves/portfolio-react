import {RegistryManagementItem} from "../../interfaces/registries";
import {Registry} from "../../classes/registry";
import {throwInitializationError} from "../../classes/registry-manager";
import {ResolvedNode} from "../../interfaces/resolved";

export class ResolvedRegistryClass extends Registry<string, any> {
	override add(
		key: string,
		value: ResolvedNode<any>,
		isDefault: boolean = false
	): ResolvedRegistryClass {
		return super.add(key, value, isDefault);
	}
}

let instance: ResolvedRegistryClass | undefined;

export const ResolvedRegistry = {
	get current(): ResolvedRegistryClass {
		if (!instance)
			throwInitializationError("ResolvedRegistry");

		return instance!;
	}
};

export const ResolvedRegistryManagementItem: RegistryManagementItem = {
	initialize: (): ResolvedRegistryClass => {
		instance = new ResolvedRegistryClass();

		instance.lockDefaults();

		return instance;
	}
}