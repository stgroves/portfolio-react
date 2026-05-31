import {ModifierRegistryItem, RegistryManagementItem} from "../../../interfaces/registries";
import {PlaceholderRegistryItem} from "./placeholder";
import {RequiredRegistryItem} from "./required";
import {Registry} from "../../../classes/registry";
import {ReadOnlyRegistryItem} from "./readonly";
import {SizeRegistryItem} from "./size";
import {DisabledRegistryItem} from "./disabled";
import {MaxLengthRegistryItem} from "./max-length";
import {MinLengthRegistryItem} from "./min-length";
import {MaskRegistryItem} from "./mask";
import {TooltipRegistryItem} from "./tooltip";
import {ModifierType, ModifierTypes} from "./types";
import {throwInitializationError} from "../../../classes/registry-manager";

let instance: Registry<ModifierType, ModifierRegistryItem<any>> | undefined;

export function isModifier(type: string): type is ModifierType {
	return ModifierRegistry.current.has(type as ModifierType);
}

export const ModifierRegistry = {
	get current(): Registry<ModifierType, ModifierRegistryItem<any>> {
		if (!instance)
			throwInitializationError("ModifierRegistry");

		return instance!;
	}
};

export const ModifierRegistryManagementItem: RegistryManagementItem = {
	initialize: (): Registry<ModifierType, ModifierRegistryItem<any>> => {
		instance = new Registry<ModifierType, ModifierRegistryItem<any>>();

		instance.add(ModifierTypes.Placeholder, PlaceholderRegistryItem, true);
		instance.add(ModifierTypes.Required, RequiredRegistryItem, true);
		instance.add(ModifierTypes.ReadOnly, ReadOnlyRegistryItem, true);
		instance.add(ModifierTypes.Size, SizeRegistryItem, true);
		instance.add(ModifierTypes.Disabled, DisabledRegistryItem, true);
		instance.add(ModifierTypes.MaxLength, MaxLengthRegistryItem, true);
		instance.add(ModifierTypes.MinLength, MinLengthRegistryItem, true);
		instance.add(ModifierTypes.Mask, MaskRegistryItem, true);
		instance.add(ModifierTypes.Tooltip, TooltipRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}