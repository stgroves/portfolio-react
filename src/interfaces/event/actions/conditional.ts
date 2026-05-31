import {EventAction} from "./index";
import {EventActionTypes} from "../../../features/tree-builder";
import {Expression} from "../expressions";
import {Operator} from "../operators";

export interface ConditionalEventAction extends EventAction<typeof EventActionTypes.Conditional> {
	condition: Expression | Operator;
	then: EventAction[];
	else?: EventAction[];
}