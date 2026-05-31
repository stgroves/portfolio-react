import {ModifierRegistryItem} from "../../../interfaces/registries";
import {RequiredModifier} from "../../../interfaces/json/modifiers/general-modifiers";

export const RequiredRegistryItem: ModifierRegistryItem<RequiredModifier> = {
	process(modifier: RequiredModifier, properties: any): any {
		properties.required = modifier.enabled;
		return properties;
	}
} as const;