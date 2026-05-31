import {ModifierRegistryItem} from "../../../interfaces/registries";
import {ReadOnlyModifier} from "../../../interfaces/json/modifiers/general-modifiers";

export const ReadOnlyRegistryItem: ModifierRegistryItem<ReadOnlyModifier> = {
	process(modifier: ReadOnlyModifier, properties: any): any {
		properties.readOnly = modifier.enabled;
		return properties;
	}
}