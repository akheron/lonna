import { Event, Atom, AtomSeed, EventStream, EventStreamSeed, Observable, Observer, Property, PropertySeed, PropertySubscribe } from "./abstractions"
import { applyScope, applyScopeMaybe } from "./applyscope"
import { atom } from "./atom"
import { changes } from "./changes"
import { Scope } from "./scope"
import { StreamTransformer, transform } from "./transform"
import { rename } from "./util"

export type EventStreamDelay<V> = (stream: EventStreamSeed<V>) => EventStreamSeed<V>

export function transformChanges<A>(desc: string, seed: EventStreamSeed<A> | EventStream<A>, transformer: EventStreamDelay<A>): EventStreamSeed<A>
export function transformChanges<A>(desc: string, seed: Property<A>, transformer: EventStreamDelay<A>): PropertySeed<A>
export function transformChanges<A>(desc: string, seed: EventStreamSeed<A> | EventStream<A>, transformer: EventStreamDelay<A>, scope: Scope): EventStream<A>
export function transformChanges<A>(desc: string, seed: Property<A>, transformer: EventStreamDelay<A>, scope: Scope): Property<A>
// TODO: implement for Atom
//export function transformChanges<A>(desc: string, seed: AtomSeed<A> | Atom<A>, transformer: EventStreamDelay<A>): AtomSeed<A>
export function transformChanges<A>(desc: string, o: Observable<A>, transformer: EventStreamDelay<A>): Observable<A> // A generic signature. Note that the implementation is defined for the above cases only.

export function transformChanges<A, B>(desc: string, x: any, transformer: EventStreamDelay<A>, scope?: Scope): any {
    if (x instanceof EventStream || x instanceof EventStreamSeed) {
        return rename(desc, transformer(x)) // Note: stream passed as seed, seems to work...
    } else if (x instanceof Property || x instanceof PropertySeed) {
        return applyScopeMaybe(new PropertySeed(desc, observer => {
            const unsub = transformer(changes(x)).subscribe(observer)
            const initial = x.get()
            observer(initial)
            return [initial, unsub]
        }))
    } else {
        throw Error("Unknown observable " + x)
    }
}