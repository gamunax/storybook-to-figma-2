
export abstract class CDKUtils {
  /**
   * Transforms a string in camelCase to kebab-case
   * @param str the string in camelCase
   * @returns the string in kebab-case
   */
  public static toKebabCase(str: string = ''): string {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
  }
}
