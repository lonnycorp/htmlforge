import { describe, expect, test } from "bun:test"

import type { Text as TextArtifact } from "@src/artifact/text"
import { Text } from "@src/node"

describe("Text", () => {

    test("emits a text fragment", () => {
        const node = new Text("text")
        const buildArtifacts = Array.from(node.build()) as TextArtifact[]

        expect(buildArtifacts).toEqual([{
            buildArtifactType: "TEXT",
            text: "text"
        }])
    })
})
