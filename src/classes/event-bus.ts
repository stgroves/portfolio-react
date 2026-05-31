import {Registry} from "./registry";

type Handler<T> = (payload: T) => void;

export class EventBusClass {
	static createComponentChannel(componentType: string, id: string, eventName: string): string {
		return `${componentType}:${id}:${eventName}`;
	}

	static createBranchChannel(branchID: string, eventName: string): string {
		return `branch:${branchID}:${eventName}`;
	}

	static createGlobalChannel(eventName: string): string {
		return `global:${eventName}`;
	}

	private channels = new Registry<string, Set<Handler<any>>>();

	subscribe<T>(channel: string, handler: Handler<T>): () => void {
		if (!this.channels.has(channel))
			this.channels.add(channel, new Set());

		this.channels.get(channel)!.add(handler);

		return (): void => { this.channels.get(channel)!.delete(handler); };
	}

	publish<T>(channel: string, payload: T): void {
		this.channels.get(channel)?.forEach((handler: Handler<any>): void => handler(payload));
	}
}

export const EventBus = new EventBusClass();