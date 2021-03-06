import { EventStream, EventStreamSeed } from ".";
import { Scope } from "./scope";
export declare function interval<V>(delay: number, value: V, scope: Scope): EventStream<V>;
export declare function interval<V>(delay: number, value: V): EventStreamSeed<V>;
