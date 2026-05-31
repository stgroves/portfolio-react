import {ModifierRegistryItem} from "../../../interfaces/registries";
import {DisabledModifier} from "../../../interfaces/json/modifiers/general-modifiers";

export const DisabledRegistryItem: ModifierRegistryItem<DisabledModifier> = {
	process(modifier: DisabledModifier, properties: any): any {
		properties.disabled = modifier.enabled;
		return properties;
	}
}