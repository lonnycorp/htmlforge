import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact/raw"
import type { Raw } from "@src/artifact/raw"

describe("artifact.raw.render", () => {

    test("renders RAW artifacts without escaping", () => {
        const raw = "<script>alert(\"raw\")</script>"
        const artifact: Raw = {
            buildArtifactType: "RAW",
            raw
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual(raw)
    })
})
