import type { ZodTypeAny } from 'zod'

import { z } from 'zod'

export const withMetadata = <T extends ZodTypeAny, M>(
  schema: T,
  metadata: M
): T => {
  schema._def.metadata = metadata
  return schema
}

export const literalSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null()
])
export type Literal = z.infer<typeof literalSchema>
export type Json = { [key: string]: Json } | Json[] | Literal
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractZodDef = <T extends ZodTypeAny>(schema: T): any => {
  const def = schema._def
  if (def.typeName === 'ZodEffects') {
    return extractZodDef(def.schema)
  }

  if (def.typeName === 'ZodOptional') {
    return extractZodDef(def.innerType)
  }

  if (def.typeName === 'ZodDefault') {
    return extractZodDef(def.innerType)
  }

  return def
}

export const zodColor = z
  .string()
  .regex(
    /(#(?:[0-9a-f]{2}){2,4}$|(#[0-9a-f]{3}$)|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$|black$|silver$|gray$|whitesmoke$|maroon$|red$|purple$|fuchsia$|green$|lime$|olivedrab$|yellow$|navy$|blue$|teal$|aquamarine$|orange$|aliceblue$|antiquewhite$|aqua$|azure$|beige$|bisque$|blanchedalmond$|blueviolet$|brown$|burlywood$|cadetblue$|chartreuse$|chocolate$|coral$|cornflowerblue$|cornsilk$|crimson$|currentcolor$|darkblue$|darkcyan$|darkgoldenrod$|darkgray$|darkgreen$|darkgrey$|darkkhaki$|darkmagenta$|darkolivegreen$|darkorange$|darkorchid$|darkred$|darksalmon$|darkseagreen$|darkslateblue$|darkslategray$|darkslategrey$|darkturquoise$|darkviolet$|deeppink$|deepskyblue$|dimgray$|dimgrey$|dodgerblue$|firebrick$|floralwhite$|forestgreen$|gainsboro$|ghostwhite$|goldenrod$|gold$|greenyellow$|grey$|honeydew$|hotpink$|indianred$|indigo$|ivory$|khaki$|lavenderblush$|lavender$|lawngreen$|lemonchiffon$|lightblue$|lightcoral$|lightcyan$|lightgoldenrodyellow$|lightgray$|lightgreen$|lightgrey$|lightpink$|lightsalmon$|lightseagreen$|lightskyblue$|lightslategray$|lightslategrey$|lightsteelblue$|lightyellow$|limegreen$|linen$|mediumaquamarine$|mediumblue$|mediumorchid$|mediumpurple$|mediumseagreen$|mediumslateblue$|mediumspringgreen$|mediumturquoise$|mediumvioletred$|midnightblue$|mintcream$|mistyrose$|moccasin$|navajowhite$|oldlace$|olive$|orangered$|orchid$|palegoldenrod$|palegreen$|paleturquoise$|palevioletred$|papayawhip$|peachpuff$|peru$|pink$|plum$|powderblue$|rosybrown$|royalblue$|saddlebrown$|salmon$|sandybrown$|seagreen$|seashell$|sienna$|skyblue$|slateblue$|slategray$|slategrey$|snow$|springgreen$|steelblue$|tan$|thistle$|tomato$|transparent$|turquoise$|violet$|wheat$|white$|yellowgreen$|rebeccapurple$)/i,
    'Not a valid CSS color.'
  )
