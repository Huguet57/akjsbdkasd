/**
 * Password utility helpers for strength calculation and validation.
 *
 * Provides functions for password strength calculation, passphrase generation, and password validation.
 */
export declare const MEDIUM_SCORE_THRESHOLD = 0.5;
export declare const STRONG_SCORE_THRESHOLD = 0.75;
export declare const VERY_STRONG_SCORE_THRESHOLD = 0.9;
/**
 * Password strength levels.
 */
export type PasswordStrengthLabel = 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
/**
 * Password summary information.
 */
export interface PasswordSummary {
    value: number;
    label: PasswordStrengthLabel;
}
/**
 * Gets a list of invalid characters in the provided text.
 *
 * Replaces spaces with `SPACE` for visibility.
 *
 * @param text - The text to check for invalid characters.
 * @returns Array of unique invalid characters.
 *
 * @example
 * ```ts
 * const invalid = getInvalidCharacters('Pa$$ word');
 * // invalid === ['$', 'SPACE']
 * ```
 */
export declare function getInvalidCharacters(text?: string): string[];
/**
 * Converts a numeric password strength score to a human-readable label.
 *
 * @param score - The strength score (0-1).
 * @returns The corresponding strength label.
 *
 * @example
 * ```ts
 * const label = getPasswordStrengthLabel(0.8);
 * // label === 'Strong'
 * ```
 */
export declare function getPasswordStrengthLabel(score: number): PasswordStrengthLabel;
/**
 * Calculates the diversity score of a password based on character types used.
 *
 * Considers lowercase, uppercase, digits, and special characters.
 *
 * @param password - The password to analyse.
 * @returns A score between 0 and 1 representing character diversity.
 *
 * @example
 * ```ts
 * const diversity = calculatePasswordDiversityScore('Password123!');
 * ```
 */
export declare function calculatePasswordDiversityScore(password: string): number;
/**
 * Calculates the overall password strength combining diversity and entropy.
 *
 * @param password - The password to analyse.
 * @returns A strength score between 0 and 1.
 *
 * @example
 * ```ts
 * const strength = getPasswordStrength('Password123!');
 * ```
 */
export declare function getPasswordStrength(password?: string): number;
/**
 * Gets a comprehensive summary of password strength.
 *
 * @param password - The password to analyse.
 * @returns An object containing the strength value and label.
 *
 * @example
 * ```ts
 * const summary = getPasswordSummary('Password123!');
 * // summary === { value: 0.74, label: 'Strong' }
 * ```
 */
export declare function getPasswordSummary(password?: string): PasswordSummary;
