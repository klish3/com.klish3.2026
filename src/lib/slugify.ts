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
    .replace(/[\s\u2011\u2010\u2012\u2013\u2014\-._]+/g, "-") // Replace spaces and hyphen-like chars with -
    .replace(/[^\w-]+/g, "")         // Remove all non-word chars except hyphen
    .replace(/--+/g, "-")            // Replace multiple - with single -
    .replace(/^-+/, "")              // Trim - from start of text
    .replace(/-+$/, "");             // Trim - from end of text
};
