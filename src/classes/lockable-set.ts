import {Lockable, LockableEntry} from "./lockable";

export class LockableSet<TType> extends Lockable<Set<TType>> {
	get size(): number { return this.data.size + this.defaultData.size; }

	constructor(data?: Iterable<LockableEntry<TType>>) {
		super(Set<TType>, "LockableSet");

		if (!data)
			return;

		for (const entry of data) {
			const {value, isDefault = true} = entry;
			this.add(value, isDefault);
		}
	}

	*#iterator(): IterableIterator<TType> {
		yield* this.defaultData.values();
		yield* this.data.values();
	}

	[Symbol.iterator](): IterableIterator<TType> {
		return this.#iterator();
	}

	keys(): SetIterator<TType> {
		const self: this = this;

		function* iterator(): IterableIterator<TType> {
			yield* self.defaultData.keys();
			yield* self.data.keys();
		}

		return iterator() as SetIterator<TType>;
	}

	values(): SetIterator<TType> {
		return this.#iterator() as SetIterator<TType>;
	}

	entries(): SetIterator<[TType, TType]> {
		const self: this = this;

		function* iterator(): IterableIterator<[TType, TType]> {
			yield* self.defaultData.entries();
			yield* self.data.entries();
		}

		return iterator() as SetIterator<[TType, TType]>;
	}

	add(value: TType, isDefault: boolean = false): LockableSet<TType> {
		if (this.has(value))
			return this;

		if (isDefault) {
			this.applyIfUnlocked((): Set<TType> => this.defaultData.add(value));
		} else
			this.data.add(value);

		return this;
	};

	has(value: TType): boolean {
		return this.defaultData.has(value) || this.data.has(value);
	}

	delete(value: TType): boolean {
		if (this.defaultData.has(value))
			return this.applyIfUnlocked((): boolean => this.defaultData.delete(value));

		return this.data.delete(value);
	}

	clear(): void {
		this.data.clear();
		this.applyIfUnlocked((): void => {this.defaultData.clear()}, (): void => {});
	};
}