import {ModifierRegistryItem} from "../../../interfaces/registries";
import {PlaceholderModifier} from "../../../interfaces/json/modifiers/general-modifiers";

export const PlaceholderRegistryItem: ModifierRegistryItem<PlaceholderModifier> = {
	process(modifier: PlaceholderModifier, properties: any): any {
		properties.placeholder = modifier.value;

		return properties;
	}
} as const;