import { applyScope } from "./applyscope"
import { changes } from "./changes"
import { toProperty } from "./property"
import { expectStreamEvents, series, testScope } from "./test-utils"

describe("changes", () => {
    expectStreamEvents(() => {
        const c = series(1, [1,2]).pipe(toProperty(0), changes)
        return c
        },
        [1,2]
    )
    expectStreamEvents(() => {
        const c = series(1, [1,2]).pipe(toProperty(0), changes, applyScope(testScope()))
        return c
        },
        [1,2]
    )
})