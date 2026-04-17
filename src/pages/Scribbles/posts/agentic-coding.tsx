export const meta = {
  title: "The Art of Agentic Coding",
  slug: "agentic-coding",
  date: "2024-01-21",
  author: "Tawanda K",
  category: "Engineering",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  excerpt: "Exploring how AI agents are transforming the way we write, debug, and maintain complex software systems."
};

export default function AgenticCoding() {
  return (
    <>
      <p>
        Agentic coding is more than just autocompletion. It's about having an autonomous partner that understands the context of your entire project.
      </p>

      <h2>Why it matters</h2>

      <ul>
        <li><strong>Speed</strong>: Automate repetitive tasks like project setup and dependency management.</li>
        <li><strong>Context</strong>: Agents can look across your whole codebase to find patterns.</li>
        <li><strong>Quality</strong>: Better linting and testing integration.</li>
      </ul>

      <h3>The Future</h3>

      <p>
        We are moving away from writing every line of code manually. Instead, we are becoming <strong>orchestrators of intent</strong>.
      </p>

      <pre><code className="language-javascript">{`const agent = new Agent();
agent.performTask("Build me a blog");`}</code></pre>

      <p>Stay curious!</p>
    </>
  );
}
