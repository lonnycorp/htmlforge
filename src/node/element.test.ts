import { describe, expect, test } from "bun:test"

import type { Artifact } from "@src/artifact"
import type { StyledClass } from "@src/artifact/styled-class"
import type { TagOpen } from "@src/artifact/tag-open"
import { Element, Text } from "@src/node"

describe("Element", () => {

    test("renders div with attributes and CSS rules", () => {
        const node = new Element("div")
            .attribute("id", "demo")
            .attribute("data-role", "content")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("color", "red", { pseudoSelector: ":hover" })
            .style("background-color", "#fafafa", { pseudoSelector: ":focus" })
            .style("font-size", "12px", { mediaQuery: "@media (max-width: 600px)" })

        const buildArtifacts = Array.from(node.build()) as Artifact[]

        expect(buildArtifacts.map(a => a.buildArtifactType)).toEqual([
            "STYLED_CLASS",
            "TAG_OPEN",
            "TAG_CLOSE"
        ])

        const styledClass = buildArtifacts[0] as StyledClass
        expect(styledClass.styles).toEqual([
            { name: "display", value: "flex", pseudoSelector: null, mediaQuery: null },
            { name: "justify-content", value: "center", pseudoSelector: null, mediaQuery: null },
            { name: "color", value: "red", pseudoSelector: ":hover", mediaQuery: null },
            { name: "background-color", value: "#fafafa", pseudoSelector: ":focus", mediaQuery: null },
            { name: "font-size", value: "12px", pseudoSelector: null, mediaQuery: "@media (max-width: 600px)" }
        ])

        const tagOpen = buildArtifacts[1] as TagOpen
        expect(tagOpen.tagName).toBe("div")
        expect(tagOpen.isVoid).toBe(false)
        expect(tagOpen.attributes).toEqual([
            { name: "id", value: "demo" },
            { name: "data-role", value: "content" },
            { name: "class", value: styledClass.className }
        ])

        const tagClose = buildArtifacts[2]
        expect(tagClose).toEqual({
            buildArtifactType: "TAG_CLOSE",
            tagName: "div"
        })
    })

    test("renders nested div tree", () => {
        const parent = new Element("div").attribute("id", "root")
            .style("padding", "8px")
            .style("margin", "4px", { pseudoSelector: ":first-child" })
        const childOne = new Element("div").attribute("data-child", "one")
            .style("color", "green")
            .style("font-weight", "500", { pseudoSelector: ":hover" })
        const childTwo = new Element("div").attribute("data-child", "two")
            .style("background-color", "#eee")
            .style("border-color", "#ccc", { pseudoSelector: ":focus" })

        childOne.child(new Text("child-one"))
        childTwo
            .child(new Text("child-two"))
            .child(
                new Element("div")
                    .attribute("data-child", "nested")
                    .style("font-weight", "bold")
                    .child(new Text("nested-child"))
            )

        parent
            .child(childOne)
            .child(childTwo)

        const buildArtifacts = Array.from(parent.build()) as Artifact[]

        expect(buildArtifacts.map(a => a.buildArtifactType)).toEqual([
            "STYLED_CLASS",
            "TAG_OPEN",
            "STYLED_CLASS",
            "TAG_OPEN",
            "TEXT",
            "TAG_CLOSE",
            "STYLED_CLASS",
            "TAG_OPEN",
            "TEXT",
            "STYLED_CLASS",
            "TAG_OPEN",
            "TEXT",
            "TAG_CLOSE",
            "TAG_CLOSE",
            "TAG_CLOSE"
        ])
    })

    test("does not emit a styled class artifact when no styles are provided", () => {
        const node = new Element("section")
            .attribute("data-kind", "plain")
            .child(new Text("content"))

        const buildArtifacts = Array.from(node.build()) as Artifact[]

        expect(buildArtifacts).toEqual([
            {
                buildArtifactType: "TAG_OPEN",
                tagName: "section",
                isVoid: false,
                attributes: [
                    { name: "data-kind", value: "plain" }
                ]
            },
            {
                buildArtifactType: "TEXT",
                text: "content"
            },
            {
                buildArtifactType: "TAG_CLOSE",
                tagName: "section"
            }
        ])
    })

    test("renders void elements once and ignores children", () => {
        const img = new Element("img")
            .attribute("src", "/logo.png")
            .attribute("alt", "Logo")
            .style("width", "128px")
            .child(new Text("should-not-render"))

        const buildArtifacts = Array.from(img.build()) as Artifact[]

        const styledClass = buildArtifacts[0] as StyledClass
        expect(styledClass.styles).toEqual([
            { name: "width", value: "128px", pseudoSelector: null, mediaQuery: null }
        ])

        expect(buildArtifacts[1]).toEqual({
            buildArtifactType: "TAG_OPEN",
            tagName: "img",
            isVoid: true,
            attributes: [
                { name: "src", value: "/logo.png" },
                { name: "alt", value: "Logo" },
                { name: "class", value: styledClass.className }
            ]
        })
    })
})
