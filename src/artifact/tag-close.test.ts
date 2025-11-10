import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact/tag-close"
import type { TagClose } from "@src/artifact/tag-close"

describe("artifact.tagClose.render", () => {

    test("renders TAG_CLOSE artifacts", () => {
        const artifact: TagClose = {
            buildArtifactType: "TAG_CLOSE",
            tagName: "section"
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual("</section>")
    })
})
