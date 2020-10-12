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
export declare abstract class ObservableSeed<V extends Observable<any>> {
    abstract desc: string;
    abstract consume(): V;
}
export declare abstract class Observable<V> extends ObservableSeed<Observable<V>> {
    desc: string;
    constructor(desc: string);
    abstract subscribe(observer: Observer<Event<V>>): Unsub;
    forEach(observer: Observer<V>): Unsub;
    log(message?: string): void;
    toString(): string;
    consume(): this;
}
export declare function isObservable<V>(x: any): x is Observable<V>;
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
export declare class PropertySeed<V> implements ObservableSeed<PropertySource<V>> {
    private _source;
    desc: string;
    constructor(desc: string, get: () => V, onChange: Subscribe<V>);
    consume(): PropertySource<V>;
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
export declare class EventStreamSeed<V> extends Observable<V> {
    subscribe: (observer: Observer<Event<V>>) => Unsub;
    constructor(desc: string, subscribe: Subscribe<V>);
}
export declare abstract class Atom<V> extends Property<V> {
    constructor(desc: string);
    abstract set(newValue: V): void;
    abstract modify(fn: (old: V) => V): void;
}
/**
 *  Input source for a StatefulProperty. Returns initial value and supplies changes to observer.
 *  Must skip duplicates!
 **/
export declare class AtomSeed<V> implements ObservableSeed<AtomSource<V>> {
    private _source;
    desc: string;
    constructor(desc: string, get: () => V, subscribe: Subscribe<V>, set: (updatedValue: V) => void);
    consume(): AtomSource<V>;
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
}
