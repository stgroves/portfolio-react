import {EventActionRegistryItem} from "../../../../interfaces/registries/event-action-registry-item";
import {BasicEventAction} from "../../../../interfaces/event";
import {ResolvedRegistry} from "../../resolved-registry";

export const BasicEventActionRegistryItem: EventActionRegistryItem<BasicEventAction> = {
	process(action: BasicEventAction): void {
		ResolvedRegistry.current.get(action.targetID).api[action.action]?.(action.args);
	}
};