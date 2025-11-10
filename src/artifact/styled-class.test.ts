import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact/styled-class"
import type { StyledClass } from "@src/artifact/styled-class"

describe("artifact.styledClass.render", () => {

    test("renders basic STYLED_CLASS artifacts", () => {
        const artifact: StyledClass = {
            buildArtifactType: "STYLED_CLASS",
            className: "fabc123",
            styles: [
                { name: "color", value: "red", pseudoSelector: null, mediaQuery: null },
                { name: "background-color", value: "#fff", pseudoSelector: null, mediaQuery: null },
            ]
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual(
            ".fabc123 {color: red;background-color: #fff;}"
        )
    })

    test("renders STYLED_CLASS artifacts scoped by pseudo selectors and media queries", () => {
        const artifact: StyledClass = {
            buildArtifactType: "STYLED_CLASS",
            className: "fabc123",
            styles: [
                { name: "color", value: "blue", pseudoSelector: ":hover", mediaQuery: null },
                { name: "max-width", value: "500px", pseudoSelector: null, mediaQuery: "@media (max-width: 600px)" },
                { name: "padding", value: "4px", pseudoSelector: null, mediaQuery: null },
                { name: "font-weight", value: "700", pseudoSelector: ":hover", mediaQuery: "@media (max-width: 600px)" },
            ]
        }
        const fragments: string[] = []

        render(artifact, fragments)

        expect(fragments.join("")).toEqual([
            ".fabc123:hover {color: blue;}",
            "@media (max-width: 600px) {.fabc123 {max-width: 500px;}}",
            ".fabc123 {padding: 4px;}",
            "@media (max-width: 600px) {.fabc123:hover {font-weight: 700;}}"
        ].join(""))
    })
})
