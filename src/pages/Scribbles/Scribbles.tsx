import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { getAllPosts } from "../../lib/postLoader";
import { Link } from "react-router-dom";

const posts = getAllPosts();



export const Scribbles: React.FC = () => {
  return (
    <>
      <div className="mt-24 md:mt-40">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Thoughts & Observations
        </p>
        <h1 className="mt-6 text-5xl md:text-8xl font-medium leading-[0.95] tracking-tight text-stone-900 dark:text-stone-50">
          Scribbles <span className="italic font-light text-stone-500 dark:text-stone-400">& Thoughts.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
          Sharing perspective on technology, design leadership, and the 
          future of front-end engineering in a rapidly evolving landscape.
        </p>
      </div>

      <section className="mt-32 md:mt-48 border-t border-stone-200 dark:border-stone-800 pt-16">
        <div className="space-y-24">
          {posts.map((post, index) => (
            <Link to={`/scribbles/${post.slug}`} key={post.slug || index} className="block group">
              <article className="grid grid-cols-1 md:grid-cols-12 gap-8 cursor-pointer">
              <div className="md:col-span-3">
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-100 dark:bg-stone-900 grayscale hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400">
                   <div className="flex items-center gap-2">
                     <Calendar className="h-3 w-3" /> {post.date}
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock className="h-3 w-3" /> {post.readTime}
                   </div>
                </div>
              </div>
              
              <div className="md:col-span-9 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400 mb-4 block">
                    {post.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-stone-500 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="mt-6 text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <User className="h-4 w-4" /> {post.author}
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-100 group/btn">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </article>
          </Link>
          ))}
        </div>
      </section>
    </>
  );
};

