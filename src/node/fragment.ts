import type { Artifact } from "@src/artifact"
import type { Buildable } from "./buildable"

export class Fragment implements Buildable {

    private readonly children: Buildable[]

    constructor() {
        this.children = []
    }

    child(node : Buildable) {
        this.children.push(node)
        return this
    }

    *build(): Iterable<Artifact> {
        for (const child of this.children) {
            yield* child.build()
        }
    }
}
