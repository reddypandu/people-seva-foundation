import { Arrow } from "./navbar";

const blogPosts = [
  {
    category: "Community care",
    date: "18 Sep 2026",
    title: "Small acts that make support feel closer",
    excerpt:
      "How consistent listening, care, and local action help families move forward with confidence.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Education",
    date: "06 Sep 2026",
    title: "Learning is the beginning of every possibility",
    excerpt:
      "A look at the people and programmes helping learners build skills, self-belief, and opportunity.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Stories of change",
    date: "28 Aug 2026",
    title: "When a community chooses to stand together",
    excerpt:
      "The everyday partnerships that turn compassion into practical, lasting support.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Wellbeing",
    date: "12 Aug 2026",
    title: "Care is more than a moment",
    excerpt:
      "Why continuity, dignity, and emotional safety matter in every support journey.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Livelihoods",
    date: "30 Jul 2026",
    title: "Skills that create a stronger tomorrow",
    excerpt:
      "Practical learning and mentorship can open doors to independence and confidence.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Field notes",
    date: "16 Jul 2026",
    title: "Listening first, then building together",
    excerpt:
      "What grassroots work teaches us about designing support around real lives.",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85",
  },
];

export { blogPosts };

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
