let counter = 100

/**
 * Simple deterministic fake SHA generator.
 * Produces 7-character hex strings that look like real short SHAs.
 */
export function useShaGenerator() {
  function generateSha(message, parentSha) {
    // Simple hash: combine inputs into a numeric seed, convert to hex
    let hash = 0
    const input = `${message}:${parentSha || 'root'}:${counter++}`
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash + char) | 0
    }
    // Convert to 7-char hex, ensure positive
    return Math.abs(hash).toString(16).padStart(7, '0').slice(0, 7)
  }

  return { generateSha }
}
