/**
 * Converts a string into a human-readable, URL-friendly slug.
 * Example: "Modernising an Enterprise Front-End - From Monoliths to Micro-Frontends" 
 * becomes "modernising-an-enterprise-front-end-from-monoliths-to-micro-frontends"
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w-]+/g, "")         // Remove all non-word chars
    .replace(/--+/g, "-")            // Replace multiple - with single -
    .replace(/^-+/, "")              // Trim - from start of text
    .replace(/-+$/, "");             // Trim - from end of text
};
