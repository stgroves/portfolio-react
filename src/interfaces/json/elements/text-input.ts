import {ElementTypes} from "../../../features/tree-builder";
import {JSONStylableNode} from "../stylable";
import {ModifiableMixin} from "../mix-ins/modifiable";
import {EventMixin} from "../mix-ins/event";
import {SingleValue} from "../../mix-ins/single-value";

export interface JSONTextInputNode
	extends JSONStylableNode<typeof ElementTypes.TextInput>, ModifiableMixin, EventMixin, SingleValue<string> {}