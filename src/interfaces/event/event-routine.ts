import {EventAction} from "./actions";

export interface EventRoutine {
	trigger: string;
	actions: EventAction[];
}