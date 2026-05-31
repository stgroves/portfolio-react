import {EventMixin} from "../mix-ins/event";
import {JSONContainerNode} from "../container";
import {ElementTypes} from "../../../features/tree-builder";

export interface JSONLabelNode extends JSONContainerNode<typeof ElementTypes.Label>, EventMixin {}