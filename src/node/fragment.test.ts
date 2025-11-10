import { describe, expect, test } from "bun:test"

import type { Artifact } from "@src/artifact"
import { Element, Fragment, Text } from "@src/node"

describe("Fragment", () => {

    test("renders nested div tree", () => {
        const parent = new Fragment()
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
        ])
    })
})
