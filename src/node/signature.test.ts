import { describe, expect, test } from "bun:test"

import { Signature, RAW } from "@src/node/signature"

describe("Signature", () => {
    test("emits the signature notice as a RAW build artifact", () => {
        const node = new Signature()
        const buildArtifacts = Array.from(node.build())

        expect(buildArtifacts).toEqual([{
            buildArtifactType: "RAW",
            raw: RAW
        }])
    })
})
