import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin} from "../mix-ins";

export interface OrOperator extends Operator<typeof OperatorTypes.Or>, MultipleInputMixin {}