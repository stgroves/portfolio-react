import {Registry} from "../../../../classes/registry";
import {throwInitializationError} from "../../../../classes/registry-manager";
import {RegistryManagementItem, ComparableRegistryItem} from "../../../../interfaces/registries";
import {StringComparableRegistryItem} from "./string";
import {BooleanComparableRegistryItem} from "./boolean";
import {NumberComparableRegistryItem} from "./number";
import {ComparableTypes} from "./types";
import {DateComparableRegistryItem} from "./date";

export class ComparableRegistryClass extends Registry<string, any> {
	override add(
		key: string,
		value: ComparableRegistryItem,
		isDefault: boolean = false
	): ComparableRegistryClass {
		return super.add(key, value, isDefault);
	}
}

let instance: ComparableRegistryClass | undefined;

export const ComparableRegistry = {
	get current(): ComparableRegistryClass {
		if (!instance)
			throwInitializationError("ComparatorRegistry");

		return instance!;
	}
} as const;

export const ComparableRegistryManagementItem: RegistryManagementItem = {
	initialize(): ComparableRegistryClass {
		instance = new ComparableRegistryClass();

		instance.add(ComparableTypes.String, StringComparableRegistryItem, true);
		instance.add(ComparableTypes.Number, NumberComparableRegistryItem, true);
		instance.add(ComparableTypes.Boolean, BooleanComparableRegistryItem, true);
		instance.add(ComparableTypes.Date, DateComparableRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
} as const;