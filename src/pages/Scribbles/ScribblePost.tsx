import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getPostBySlug, Post } from "../../lib/postLoader";

export const ScribblePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      const foundPost = getPostBySlug(slug);
      setPost(foundPost);
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-stone-950">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-full border-2 border-stone-300 dark:border-stone-700 border-t-stone-900 dark:border-t-stone-50 animate-spin" />
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-stone-950">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-stone-900 dark:text-stone-50">Post not found</h1>
          <Link to="/scribbles" className="mt-4 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Scribbles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/scribbles" className="mb-12 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Scribbles
        </Link>

        {post.image && (
          <div className="aspect-video w-full overflow-hidden rounded-sm mb-12 bg-stone-100 dark:bg-stone-900">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
          <span className="text-stone-500 dark:text-stone-400">{post.category}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {post.date}
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime}
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-stone-900 dark:text-stone-50 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-12 pb-12 border-b border-stone-100 dark:border-stone-900">
          <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-500">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{post.author}</p>
            <p className="text-xs text-stone-500">Technical Lead</p>
          </div>
        </div>

        <article className="prose prose-stone dark:prose-invert max-w-none 
          prose-headings:font-medium prose-headings:tracking-tight
          prose-p:leading-relaxed prose-p:text-stone-700 dark:prose-p:text-stone-300
          prose-a:text-stone-900 dark:prose-a:text-stone-100 prose-a:underline underline-offset-4
          prose-img:rounded-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};
