import {JSONContainerNode} from "../../container";
import {ElementTypes} from "../../../../features/tree-builder";
import {ModifiableMixin} from "../../mix-ins/modifiable";
import {EventMixin} from "../../mix-ins/event";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {SingleValue} from "../../../mix-ins/single-value";

export interface JSONCheckboxRootNode
	extends JSONContainerNode<typeof ElementTypes.CheckboxRoot>,
		ModifiableMixin,
		EventMixin,
		SingleValue<boolean|null>,
		BaseUIMixin {}