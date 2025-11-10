import { Raw } from "@src/node"
import type { Raw as RawArtifact } from "@src/artifact/raw"
import { describe, expect, test } from "bun:test"

describe("Raw", () => {
    test("emits a RAW buildArtifact", () => {
        const node = new Raw("raw")
        const buildArtifacts = Array.from(node.build()) as RawArtifact[]

        expect(buildArtifacts).toEqual([{
            buildArtifactType: "RAW",
            raw: "raw"
        }])
    })
})
