import React from "react";
import { slugify } from "./slugify";

// Vite's import.meta.glob correctly configured for TSX modules
const modules = import.meta.glob("/src/pages/Scribbles/posts/*.tsx", {
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
  readTime: string;
  Component: React.ComponentType; // React component
}

export const getAllPosts = (): Post[] => {
  return Object.keys(modules).map((path) => {
    const mod = modules[path] as any;
    const data = mod.meta || {};
    const fileName = path.split("/").pop()?.replace(".tsx", "") || "";
    const slug = data.slug || slugify(fileName);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      author: data.author || "Anonymous",
      category: data.category || "General",
      image: data.image || "",
      excerpt: data.excerpt || "",
      // Standardize a fallback readTime if not provided in meta
      readTime: data.readTime || "5 min read",
      Component: mod.default, // To render inline
    } as Post;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const posts = getAllPosts();
  const normalizedSlug = slugify(slug);
  
  return posts.find((post) => post.slug === normalizedSlug);
};
