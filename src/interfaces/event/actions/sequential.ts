import {EventActionTypes} from "../../../features/tree-builder";
import {EventAction} from "./index";

export interface SequentialEventAction extends EventAction<typeof EventActionTypes.Sequential> {
	actions: EventAction[];
}