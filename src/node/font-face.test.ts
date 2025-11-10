import { describe, expect, test } from "bun:test"

import { render } from "@src/artifact"
import { FontFace } from "@src/node"

describe("FontFace", () => {

    test("emits a style element with required @font-face descriptors", () => {
        const node = new FontFace("Inter", "/inter.woff2")
        const artifacts = Array.from(node.build())

        expect(artifacts).toEqual([
            {
                buildArtifactType: "TAG_OPEN",
                tagName: "style",
                isVoid: false,
                attributes: []
            },
            {
                buildArtifactType: "RAW",
                raw: "@font-face {"
            },
            {
                buildArtifactType: "RAW",
                raw: "font-family: Inter;"
            },
            {
                buildArtifactType: "RAW",
                raw: "src: url(\"/inter.woff2\");"
            },
            {
                buildArtifactType: "RAW",
                raw: "}"
            },
            {
                buildArtifactType: "TAG_CLOSE",
                tagName: "style"
            }
        ])
    })

    test("emits optional @font-face descriptors", () => {
        const node = new FontFace("Inter", "/inter.woff2", {
            display: "swap",
            format: "woff2",
            style: "normal",
            weight: "400"
        })
        const fragments: string[] = []

        for (const artifact of node.build()) {
            render(artifact, fragments)
        }

        expect(fragments.join("")).toEqual([
            "<style>",
            "@font-face {",
            "font-family: Inter;",
            "src: url(\"/inter.woff2\") format(\"woff2\");",
            "font-display: swap;",
            "font-style: normal;",
            "font-weight: 400;",
            "}",
            "</style>"
        ].join(""))
    })
})
