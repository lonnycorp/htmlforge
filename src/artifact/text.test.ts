import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact/text"
import type { Text } from "@src/artifact/text"
import { escapeHtml } from "@src/util"

describe("artifact.text.render", () => {

    test("renders TEXT artifacts with HTML escaping", () => {
        const text = "<div data-value=\"1\">& literal text"
        const artifact: Text = {
            buildArtifactType: "TEXT",
            text
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual(escapeHtml(text))
    })
})
