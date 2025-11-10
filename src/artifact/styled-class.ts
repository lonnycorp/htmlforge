import type { Style } from "@src/style"
import { groupBy } from "@src/util"

export type StyledClass = {
    buildArtifactType: "STYLED_CLASS",
    styles: Style[]
    className: string
}

export const render = (artifact: StyledClass, fragments: string[]): void => {
    const groupedStyles = groupBy(
        artifact.styles,
        s => JSON.stringify([s.mediaQuery, s.pseudoSelector])
    )

    for (const styles of groupedStyles.values()) {
        const { mediaQuery, pseudoSelector } = styles[0] as Style
        if (mediaQuery) {
            fragments.push(`${mediaQuery} {`)
        }

        const selector = pseudoSelector
            ? `.${artifact.className}${pseudoSelector}`
            : `.${artifact.className}`

        fragments.push(`${selector} {`)

        for (const style of styles) {
            fragments.push(`${style.name}: ${style.value};`)
        }

        fragments.push("}")

        if (mediaQuery) {
            fragments.push("}")
        }
    }
}
