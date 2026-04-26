# Skill: MD to TSX Blog Post Converter

**Description:** 
This skill enables the AI to automatically convert raw `.md` blog post files into native React `.tsx` page components for the `Scribbles` blog architecture.

**Trigger/Context:** 
Run this skill when asked to convert a markdown file into a React blog post, or when a new `.md` file drops in `src/pages/Scribbles/posts/`.

---

## Instructions for Execution

1. **Locate the `.md` File:**
   - Find the target `.md` file in `src/pages/Scribbles/posts/`.
   - Read the contents of the file.

2. **Extract Metadata:**
   - If YAML frontmatter exists, parse it (`title`, `date`, `author`, `category`, `image`, `excerpt`).
   - If NO frontmatter exists (e.g. standard markdown), extract the first `# Heading 1` as the `title` and remove it from the body.
   - Infer or generate the following if missing:
     - `slug`: kebab-case version of the title.
     - `date`: Current YYYY-MM-DD.
     - `author`: "Tawanda K" (or default).
     - `category`: Extract contextually from the title.
     - `image`: Leave blank or find a suitable placeholder.
     - `excerpt`: Grab the first 1-2 sentences of the body.

3. **Convert Markdown to Native JSX:**
   - Do NOT use `react-markdown`.
   - Wrap paragraphs in `<p>` tags.
   - Convert `## Headings` to `<h2>`, `###` to `<h3>`.
   - Convert bullet points to `<ul>` and `<li>`.
   - Convert bold (`**text**`) to `<strong>text</strong>` and italic (`*text*`) to `<em>text</em>`.
   - Convert code blocks (` ```language ... ``` `) to `<pre><code className="language-[lang]">{`...`}</code></pre>`.
   - Ensure the JSX is valid (e.g. close tags properly, escape `{` and `}` directly in text if needed).

4. **Generate the TSX File:**
   - Create a `.tsx` file with the inferred `slug` as the filename: `src/pages/Scribbles/posts/[slug].tsx`.
   - Export the structured metadata object as `meta`.
   - Export a default React Functional Component named via PascalCase of the slug.
   - Wrap the JSX body in a React Fragment `<> ... </>`.

   **Example Output Format:**
   ```tsx
   export const meta = {
     title: "Extracted Title",
     slug: "extracted-title",
     date: "2024-04-20",
     author: "Tawanda K",
     category: "Engineering",
     image: "",
     excerpt: "First paragraph..."
   };

   export default function ExtractedTitle() {
     return (
       <>
         <p>Paragraph 1</p>
         <h2>Section 2</h2>
         <pre><code className="language-typescript">{"const x = 1;"}</code></pre>
       </>
     );
   }
   ```

5. **Clean Up:**
   - Delete the original `.md` file to prevent duplicate tracking.
   - Summarize the successful conversion to the user.
