import type { Diagnostic } from '@codemirror/lint'
import type { ValidateError } from '@markdoc/markdoc'

import { linter } from '@codemirror/lint'
import Markdoc from '@markdoc/markdoc'

const SEVERITY_MAP = {
  critical: 'error',
  debug: 'info',
  error: 'error',
  info: 'info',
  warning: 'warning'
} as const
export const markdocLinter = (errors?: ValidateError[]) =>
  linter((view) => {
    const diagnostics: Diagnostic[] = []
    const doc = view.state.doc
    if (!errors) {
      const ast = Markdoc.parse(doc.toString())
      errors = Markdoc.validate(ast)
    }
    errors.forEach(({ error, location }) => {
      let from = 0
      let to = 0

      if (location) {
        from =
          doc.line(location.start.line + 1).from +
          (location.start.character ?? 0)
        to =
          doc.line(location.end.line + 1).from + (location.end.character ?? 0)
      }
      diagnostics.push({
        from,
        message: error.message,
        severity: SEVERITY_MAP[error.level],
        to
      })
    })

    return diagnostics
  })
