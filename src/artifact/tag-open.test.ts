import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact/tag-open"
import type { TagOpen } from "@src/artifact/tag-open"
import { escapeHtml } from "@src/util"

describe("artifact.tagOpen.render", () => {

    test("renders TAG_OPEN artifacts with escaped attributes", () => {
        const title = "1 < 2"
        const artifact: TagOpen = {
            buildArtifactType: "TAG_OPEN",
            tagName: "div",
            isVoid: false,
            attributes: [
                { name: "id", value: "root" },
                { name: "title", value: title }
            ]
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual(
            `<div id="root" title="${escapeHtml(title)}">`
        )
    })

    test("renders void TAG_OPEN artifacts without further indentation", () => {
        const artifact: TagOpen = {
            buildArtifactType: "TAG_OPEN",
            tagName: "img",
            isVoid: true,
            attributes: [
                { name: "src", value: "/logo.png" },
                { name: "alt", value: "Logo" }
            ]
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual("<img src=\"/logo.png\" alt=\"Logo\">")
    })

    test("renders the last value for duplicate attributes except class", () => {
        const artifact: TagOpen = {
            buildArtifactType: "TAG_OPEN",
            tagName: "div",
            isVoid: false,
            attributes: [
                { name: "id", value: "first" },
                { name: "class", value: "one" },
                { name: "title", value: "old" },
                { name: "id", value: "last" },
                { name: "class", value: "two" },
                { name: "title", value: "new" }
            ]
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual("<div id=\"last\" class=\"one two\" title=\"new\">")
    })
})
