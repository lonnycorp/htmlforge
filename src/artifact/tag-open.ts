import type { Attribute } from "@src/node/element"
import { escapeHtml, groupBy } from "@src/util"

export type TagOpen = {
    buildArtifactType: "TAG_OPEN",
    tagName: string,
    isVoid: boolean
    attributes: Attribute[]
}

export const render = (artifact: TagOpen, fragments: string[]): void => {
    fragments.push(`<${artifact.tagName}`)

    const groupedAttributes = groupBy(artifact.attributes, attribute => attribute.name)
    for (const [name, attributes] of groupedAttributes) {
        const lastAttribute = attributes[attributes.length - 1]
        if (!lastAttribute) {
            continue
        }

        const value = name === "class"
            ? attributes.map(attribute => attribute.value).join(" ")
            : lastAttribute.value

        fragments.push(` ${name}="${escapeHtml(value)}"`)
    }

    fragments.push(">")
}
