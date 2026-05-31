import {ModifierRegistryItem} from "../../../interfaces/registries";
import {SizeModifier} from "../../../interfaces/json/modifiers/text-types/text-modifiers";

export const SizeRegistryItem: ModifierRegistryItem<SizeModifier> = {
	process(modifier: SizeModifier, properties: any): any {
		properties.size = modifier.value;
		return properties;
	}
} as const;