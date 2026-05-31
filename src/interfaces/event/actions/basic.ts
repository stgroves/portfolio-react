import {EventActionTypes} from "../../../features/tree-builder";
import {EventAction} from "./index";

export interface BasicEventAction extends EventAction<typeof EventActionTypes.Basic> {
	targetID: string;
	action: string;
	args?: any[];
}