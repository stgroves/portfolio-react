import {Registry} from "../../classes/registry";

export interface RegistryManagementItem {
	initialize: () => Registry<any, any>
}