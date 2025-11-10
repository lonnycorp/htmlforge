export type PseudoSelector = `:${string}`

export type MediaQuery = `@media${string}`

export type Style = {
    name: string,
    value: string,
    pseudoSelector: PseudoSelector | null,
    mediaQuery: MediaQuery | null
}
