import {Dictionary} from "./dictionary";
import {Lockable, LockableEntry} from "./lockable";
import {ResolvedNode} from "../interfaces/resolved/state";

export class Registry<TKey, TValue> extends Lockable<Dictionary<TKey, TValue>> {
	get size(): number { return this.data.size + this.defaultData.size; }

	constructor(data?: Iterable<[TKey, LockableEntry<TValue>]>) {
		super(Dictionary<TKey, TValue>, "Registry");

		if (!data)
			return;

		for (const [key, entry] of data) {
			const { value, isDefault = true } = entry;
			this.add(key, value, isDefault);
		}
	}

	*#iterator(): IterableIterator<[TKey, TValue]> {
		yield* this.defaultData.entries();
		yield* this.data.entries();
	}

	[Symbol.iterator](): IterableIterator<[TKey, TValue]> {
		return this.#iterator();
	}

	keys(): MapIterator<TKey> {
		const self: this = this;

		function* iterator(): IterableIterator<TKey> {
			yield* self.defaultData.keys();
			yield* self.data.keys();
		}

		return iterator() as MapIterator<TKey>;
	}

	values(): MapIterator<TValue> {
		const self: this = this;

		function* iterator(): IterableIterator<TValue> {
			yield* self.defaultData.values();
			yield* self.data.values();
		}

		return iterator() as MapIterator<TValue>;
	}

	entries(): MapIterator<[TKey, TValue]> {
		return this.#iterator() as MapIterator<[TKey, TValue]>;
	}

	add(key: TKey, value: TValue, isDefault: boolean = false): Registry<TKey, TValue> {
		if (this.has(key))
			throw new Error(`${key} already exists`);

		if (isDefault)
			this.applyIfUnlocked((): void => {this.defaultData.add(key, value)});
		else
			this.data.add(key, value);

		return this;
	};

	tryGet(key: TKey): [true, TValue] | [false, undefined] {
		return this.has(key) ? [true, this.get(key)] : [false, undefined]
	}

	get(key: TKey): TValue {
		if (this.defaultData.has(key))
			return this.defaultData.get(key);

		if (this.data.has(key))
			return this.data.get(key);

		throw new Error(`Key not found: ${key}`);
	}

	has(key: TKey): boolean {
		return this.data.has(key) || this.defaultData.has(key)
	};

	delete(key: TKey): boolean {
		if (this.defaultData.has(key))
			return this.applyIfUnlocked((): boolean => this.defaultData.delete(key));

		return this.data.delete(key);
	}

	clear(): void {
		this.data.clear();
		this.applyIfUnlocked((): void => { this.defaultData.clear() }, (): void => {});
	};
}