import { EventStream, EventStreamSeed } from ".";
import { Scope } from "./scope";
export declare function later<V>(delay: number, value: V, scope: Scope): EventStream<V>;
export declare function later<V>(delay: number, value: V): EventStreamSeed<V>;
