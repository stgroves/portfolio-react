import {Registry} from "../../../../classes/registry";
import {throwInitializationError} from "../../../../classes/registry-manager";
import {RegistryManagementItem} from "../../../../interfaces/registries/registry-management-item";
import {EventActionRegistryItem} from "../../../../interfaces/registries/event-action-registry-item";
import {EventActionTypes} from "./types";
import {BasicEventActionRegistryItem} from "./basic";

let instance: Registry<string, EventActionRegistryItem<any>> | undefined;

export function isEventAction(type: string): boolean {
	return EventActionRegistry.current.has(type);
}

export const EventActionRegistry = {
	get current(): Registry<string, EventActionRegistryItem<any>> {
		if (!instance)
			throwInitializationError("EventActionRegistry");

		return instance!;
	}
};

export const EventActionRegistryManagementItem: RegistryManagementItem = {
	initialize: (): Registry<string, EventActionRegistryItem<any>> => {
		instance = new Registry();

		instance.add(EventActionTypes.Basic, BasicEventActionRegistryItem, true);

		instance.lockDefaults();

		return instance;
	}
}