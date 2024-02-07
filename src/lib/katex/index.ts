import katex from 'katex'
import { type SuperRefinement, ZodIssueCode } from 'zod'

export function getZodValidateLatex(
  displayMode: boolean
): SuperRefinement<string> {
  return (val, ctx) => {
    try {
      katex.renderToString(val, {
        displayMode,
        macros: {},
        throwOnError: true
      })
    } catch (err) {
      if (err instanceof katex.ParseError) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `Invalid LaTeX at ${err.position}: ${err.message}`
        })
      }
    }
  }
}
