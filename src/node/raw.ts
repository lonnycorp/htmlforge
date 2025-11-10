import type { Artifact } from "@src/artifact"
import type { Buildable } from "./buildable"

export class Raw implements Buildable {

    private readonly raw : string

    constructor(raw : string) {
        this.raw = raw
    }

    *build() : Iterable<Artifact> {
        yield {
            buildArtifactType: "RAW",
            raw: this.raw
        }
    }
}
