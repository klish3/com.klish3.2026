import { slugify } from "./slugify";

// Vite's import.meta.glob with corrected syntax for newer versions
const modules = import.meta.glob("/src/pages/Scribbles/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
}

// Simple regex-based frontmatter parser for browser compatibility
const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) return { data: {}, content: fileContent };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  yamlBlock.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
    }
  });

  return { data, content };
};

export const getAllPosts = (): Post[] => {
  return Object.keys(modules).map((path) => {
    const rawContent = modules[path] as string;
    const { data, content } = parseFrontmatter(rawContent);
    const fileName = path.split("/").pop()?.replace(".md", "") || "";
    const slug = data.slug || slugify(fileName);

    // Estimate read time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      author: data.author || "Anonymous",
      category: data.category || "General",
      image: data.image || "",
      excerpt: data.excerpt || "",
      content,
      readTime,
    } as Post;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const posts = getAllPosts();
  const normalizedSlug = slugify(slug);
  
  return posts.find((post) => post.slug === normalizedSlug);
};
