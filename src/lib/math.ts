export function clamp(value: number, limits: { max?: number; min?: number }) {
  if (limits.min != null) {
    if (limits.min > value) {
      return limits.min
    }
  }
  if (limits.max != null) {
    if (limits.max < value) {
      return limits.max
    }
  }
  return value
}
