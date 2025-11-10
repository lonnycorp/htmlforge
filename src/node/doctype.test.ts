import { describe, expect, test } from "bun:test"

import { Doctype, RAW } from "@src/node/doctype"

describe("Doctype", () => {
    test("emits the HTML doctype as a RAW build artifact", () => {
        const node = new Doctype()
        const buildArtifacts = Array.from(node.build())

        expect(buildArtifacts).toEqual([{
            buildArtifactType: "RAW",
            raw: RAW
        }])
    })
})
