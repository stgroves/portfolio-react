import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins";

export interface EqualOperator extends Operator<typeof OperatorTypes.Equal>, BaseInputMixin {}