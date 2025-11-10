import { Raw } from "./raw"
import type { Artifact } from "@src/artifact"
import type { Buildable } from "./buildable"

export const RAW = "<!DOCTYPE html>"

export class Doctype implements Buildable {

    private readonly raw : Raw

    constructor() {
        this.raw = new Raw(RAW)
    }

    build() : Iterable<Artifact> {
        return this.raw.build()
    }
}
