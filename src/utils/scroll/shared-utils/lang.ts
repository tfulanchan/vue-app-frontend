export const getTime =
  Date.now ||
  function getTime() {
    return new Date().getTime()
  }
export function between(n: number, min: number, max: number) {
  if (n < min) {
    return min
  }
  if (n > max) {
    return max
  }
  return n
}
