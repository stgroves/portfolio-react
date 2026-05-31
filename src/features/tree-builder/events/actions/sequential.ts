import {EventActionRegistryItem} from "../../../../interfaces/registries/event-action-registry-item";
import {EventAction, SequentialEventAction} from "../../../../interfaces/event";
import {EventActionRegistry} from "./registry";

export const SequentialEventActionRegistryItem: EventActionRegistryItem<SequentialEventAction> = {
	process(action: SequentialEventAction): void {
		action.actions.forEach((action: EventAction): void => {
			EventActionRegistry.current.get(action.type).process(action);
		});
	}
};