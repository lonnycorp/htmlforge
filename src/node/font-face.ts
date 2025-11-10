import type { Artifact } from "@src/artifact"
import type { Buildable } from "./buildable"

export type FontFaceOptions = {
    display?: string,
    format?: string,
    style?: string,
    weight?: string,
}

export class FontFace implements Buildable {

    private readonly name : string
    private readonly url : string
    private readonly options : FontFaceOptions

    constructor(name : string, url : string, options? : FontFaceOptions) {
        this.name = name
        this.url = url
        this.options = options ?? {}
    }

    *build() : Iterable<Artifact> {
        yield {
            buildArtifactType: "TAG_OPEN",
            tagName: "style",
            isVoid: false,
            attributes: []
        }

        yield {
            buildArtifactType: "RAW",
            raw: "@font-face {"
        }
        yield {
            buildArtifactType: "RAW",
            raw: `font-family: ${this.name};`
        }
        yield {
            buildArtifactType: "RAW",
            raw: this.options.format
                ? `src: url("${this.url}") format("${this.options.format}");`
                : `src: url("${this.url}");`
        }

        if (this.options.display) {
            yield {
                buildArtifactType: "RAW",
                raw: `font-display: ${this.options.display};`
            }
        }

        if (this.options.style) {
            yield {
                buildArtifactType: "RAW",
                raw: `font-style: ${this.options.style};`
            }
        }

        if (this.options.weight) {
            yield {
                buildArtifactType: "RAW",
                raw: `font-weight: ${this.options.weight};`
            }
        }

        yield {
            buildArtifactType: "RAW",
            raw: "}"
        }

        yield {
            buildArtifactType: "TAG_CLOSE",
            tagName: "style"
        }
    }
}
