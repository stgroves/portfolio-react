import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin} from "../mix-ins";

export interface NorOperator extends Operator<typeof OperatorTypes.Nor>, MultipleInputMixin {}