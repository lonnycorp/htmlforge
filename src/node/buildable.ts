import type { Artifact } from "@src/artifact"

export interface Buildable {
    build(): Iterable<Artifact>
}
