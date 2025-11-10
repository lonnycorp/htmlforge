import type { Artifact } from "@src/artifact"
import type { Buildable } from "./buildable"

export class Text implements Buildable {

    private readonly text : string

    constructor(text : string) {
        this.text = text
    }

    *build() : Iterable<Artifact> {
        yield {
            buildArtifactType: "TEXT",
            text: this.text
        }
    }
}
