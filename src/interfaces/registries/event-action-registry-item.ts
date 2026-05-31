import {EventAction} from "../event";

export interface EventActionRegistryItem<TEventAction extends EventAction> {
	process: (action: TEventAction) => void;
}