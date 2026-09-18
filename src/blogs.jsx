import { Arrow } from "./navbar";
import { blogPosts } from "./blog-data";

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <img src={post.image} alt="" />
      <div className="blog-card-body">
        <div className="blog-meta">
          <span>{post.category}</span>
          <time>{post.date}</time>
        </div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <a className="text-link" href="/blogs">
          Read story <Arrow />
        </a>
      </div>
    </article>
  );
}

export function BlogPreview() {
  return (
    <section className="blogs-preview section-shell">
      <div className="section-head">
        <div>
          <p className="eyebrow">People Seva stories</p>
          <h2>Ideas, voices, and moments from the journey.</h2>
        </div>
        <a className="text-link" href="/blogs">
          View all stories <Arrow />
        </a>
      </div>
      <div className="blog-grid blog-grid-preview">
        {blogPosts.slice(0, 3).map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}

export default function Blogs() {
  return (
    <section className="inner-page blogs-page">
      <div className="inner-heading">
        <p className="eyebrow">People Seva stories</p>
        <h1>Stories that keep care moving.</h1>
        <p>
          Read field notes, community stories, and practical ideas from the
          people who make this work possible every day.
        </p>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
