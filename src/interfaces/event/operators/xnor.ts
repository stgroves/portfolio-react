import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin, ExclusiveModeMixin} from "../mix-ins";

export interface XnorOperator extends Operator<typeof OperatorTypes.Xnor>, MultipleInputMixin, ExclusiveModeMixin {}