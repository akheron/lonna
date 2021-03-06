import { Scope } from "./scope";
export declare type Callback = () => void;
export declare type Observer<V> = (value: V) => void;
export declare type Subscribe<V> = (observer: Observer<Event<V>>) => Unsub;
export declare abstract class Event<V> {
    abstract type: string;
}
export declare class Value<V> extends Event<V> {
    type: string;
    value: V;
    constructor(value: V);
}
export declare class End extends Event<any> {
    type: string;
}
export declare type EventLike<V> = Event<V>[] | Event<V> | V;
export declare type Unsub = Callback;
export declare function toEvent<V>(value: Event<V> | V): Event<V>;
export declare function toEvents<V>(value: EventLike<V>): Event<V>[];
export declare function valueEvent<V>(value: V): Value<V>;
export declare function isValue<V>(event: Event<V>): event is Value<V>;
export declare function isEnd<V>(event: Event<V>): event is End;
export declare function valueObserver<V>(observer: Observer<V>): Observer<Event<V>>;
export declare const endEvent: End;
export declare class Pipeable {
    pipe<A>(a2b: (a: this) => A): A;
    pipe<A, B>(a2b: (a: this) => A, b2c: (a: A) => B): B;
    pipe<A, B, C>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C): C;
    pipe<A, B, C, D>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D): D;
    pipe<A, B, C, D, E>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E): E;
    pipe<A, B, C, D, E, F>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E, f2g: (e: E) => F): F;
    pipe<A, B, C, D, E, F, G>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E, f2g: (e: E) => F, g2h: (f: F) => G): G;
    pipe<A, B, C, D, E, F, G, H>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E, f2g: (e: E) => F, g2h: (f: F) => G, h2i: (g: G) => H): H;
    pipe<A, B, C, D, E, F, G, H, I>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E, f2g: (e: E) => F, g2h: (f: F) => G, h2i: (g: G) => H, i2j: (h: H) => I): I;
    pipe<A, B, C, D, E, F, G, H, I, J>(a2b: (a: this) => A, b2c: (a: A) => B, c2d: (b: B) => C, d2e: (c: C) => D, e2f: (d: D) => E, f2g: (e: E) => F, g2h: (f: F) => G, h2i: (g: G) => H, i2j: (h: H) => I, j2k: (i: I) => J): J;
}
export declare abstract class ObservableSeed<V, O extends Observable<any>> extends Pipeable {
    desc: string;
    constructor(desc: string);
    abstract consume(): O;
    toString(): string;
    forEach(observer: Observer<V>): Unsub;
    log(message?: string): void;
}
export declare abstract class ObservableSeedImpl<V, O extends Observable<any>> extends ObservableSeed<V, O> {
    private _source;
    constructor(source: O);
    consume(): O;
}
export declare abstract class Observable<V> extends ObservableSeed<V, Observable<V>> {
    constructor(desc: string);
    abstract subscribe(observer: Observer<Event<V>>): Unsub;
    forEach(observer: Observer<V>): Unsub;
    consume(): this;
}
export declare function isObservable<V>(x: any): x is Observable<V>;
export declare function isObservableSeed<V>(x: any): x is ObservableSeed<V, any>;
export declare abstract class ScopedObservable<V> extends Observable<V> {
    constructor(desc: string);
    abstract getScope(): Scope;
}
export declare type PropertySubscribe<V> = (observer: Observer<Event<V>>) => [V, Unsub];
export declare abstract class Property<V> extends ScopedObservable<V> {
    constructor(desc: string);
    abstract get(): V;
    abstract onChange(observer: Observer<Event<V>>): Unsub;
    subscribe(observer: Observer<Event<V>>): Unsub;
}
/**
 *  Input source for a StatefulProperty. Returns initial value and supplies changes to observer.
 *  Must skip duplicates!
 **/
export declare class PropertySeed<V> extends ObservableSeedImpl<V, PropertySource<V>> {
    constructor(desc: string, get: () => V, onChange: Subscribe<V>);
}
export declare class PropertySource<V> extends Observable<V> {
    private _started;
    private _subscribed;
    private _get;
    onChange_: Subscribe<V>;
    get(): V;
    constructor(desc: string, get: () => V, onChange: Subscribe<V>);
    onChange(observer: Observer<Event<V>>): Unsub;
    subscribe(observer: Observer<Event<V>>): Unsub;
}
export declare abstract class EventStream<V> extends ScopedObservable<V> {
    constructor(desc: string);
}
export declare class EventStreamSeed<V> extends ObservableSeedImpl<V, EventStreamSource<V>> {
    constructor(desc: string, subscribe: Subscribe<V>);
}
export declare class EventStreamSource<V> extends Observable<V> {
    subscribe: (observer: Observer<Event<V>>) => Unsub;
    constructor(desc: string, subscribe: Subscribe<V>);
}
export declare abstract class Atom<V> extends Property<V> implements ObservableSeed<V, Atom<V>> {
    constructor(desc: string);
    abstract set(newValue: V): void;
    abstract modify(fn: (old: V) => V): void;
}
/**
 *  Input source for a StatefulProperty. Returns initial value and supplies changes to observer.
 *  Must skip duplicates!
 **/
export declare class AtomSeed<V> extends ObservableSeedImpl<V, AtomSource<V>> {
    constructor(desc: string, get: () => V, subscribe: Subscribe<V>, set: (updatedValue: V) => void);
}
/**
 *  Input source for a StatefulProperty. Returns initial value and supplies changes to observer.
 *  Must skip duplicates!
 **/
export declare class AtomSource<V> extends PropertySource<V> {
    set: (updatedValue: V) => void;
    constructor(desc: string, get: () => V, subscribe: Subscribe<V>, set: (updatedValue: V) => void);
}
export interface Bus<V> extends EventStream<V> {
    push(newValue: V): void;
    end(): void;
}
export declare type Function0<R> = () => R;
export declare type Function1<T1, R> = (t1: T1) => R;
export declare type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
export declare type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export declare type Function4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;
export declare type Function5<T1, T2, T3, T4, T5, R> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R;
export declare type Function6<T1, T2, T3, T4, T5, T6, R> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R;
