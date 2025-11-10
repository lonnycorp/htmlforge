export type TagClose = {
    buildArtifactType: "TAG_CLOSE",
    tagName: string
}

export const render = (artifact: TagClose, fragments: string[]): void => {
    fragments.push(`</${artifact.tagName}>`)
}
