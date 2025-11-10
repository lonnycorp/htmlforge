export type Raw = {
    buildArtifactType: "RAW"
    raw: string
}

export const render = (artifact: Raw, fragments: string[]): void => {
    fragments.push(artifact.raw)
}
