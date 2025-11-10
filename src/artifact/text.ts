import { escapeHtml } from "@src/util"

export type Text = {
    buildArtifactType: "TEXT"
    text: string
}

export const render = (artifact: Text, fragments: string[]): void => {
    fragments.push(escapeHtml(artifact.text))
}
