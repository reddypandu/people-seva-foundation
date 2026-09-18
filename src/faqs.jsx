import { Arrow } from "./navbar";

const faqItems = [
  {
    question: "What does People Seva Foundation work on?",
    answer:
      "We support women, families, and communities through education, skill development, care, wellbeing, livelihood support, and community-led initiatives.",
  },
  {
    question: "How can I support the foundation?",
    answer:
      "You can support us by donating, volunteering your time or skills, sharing our work, or partnering with us on a community initiative.",
  },
  {
    question: "How is my donation used?",
    answer:
      "Donations help provide learning support, care programmes, skill-building opportunities, healthcare assistance, and practical community support.",
  },
  {
    question: "Can I volunteer with People Seva Foundation?",
    answer:
      "Yes. We welcome people who can mentor, teach, organise, support events, contribute professional skills, or help us reach more communities.",
  },
  {
    question: "Do you work with schools and community groups?",
    answer:
      "Yes. We collaborate with schools, local groups, volunteers, and responsible partners to create programmes that respond to real community needs.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Visit our Contact page to find our phone number, email address, location, and a simple form for sending your message.",
  },
];

function FaqItem({ item, defaultOpen = false }) {
  return (
    <details className="faq-item" open={defaultOpen}>
      <summary>
        <span>{item.question}</span>
        <span className="faq-plus" aria-hidden="true" />
      </summary>
      <p>{item.answer}</p>
    </details>
  );
}

export function FaqPreview() {
  return (
    <section className="faq-preview section-shell">
      <div className="faq-preview-intro">
        <p className="eyebrow">Questions, answered</p>
        <h2>Good work starts with clarity.</h2>
        <p>
          Find quick answers about our programmes, volunteering, donations, and
          the ways you can be part of the journey.
        </p>
        <a className="text-link" href="/faqs">
          Visit FAQs <Arrow />
        </a>
      </div>
      <div className="faq-list faq-list-preview">
        {faqItems.slice(0, 3).map((item, index) => (
          <FaqItem key={item.question} item={item} defaultOpen={index === 0} />
        ))}
      </div>
    </section>
  );
}

export default function Faqs() {
  return (
    <section className="inner-page faqs-page">
      <div className="inner-heading">
        <p className="eyebrow">Questions, answered</p>
        <h1>Clarity makes care stronger.</h1>
        <p>
          Learn more about our work, the support we offer, and how you can join
          People Seva Foundation.
        </p>
      </div>
      <div className="faq-page-layout">
        <div className="faq-page-note">
          <span className="faq-number">01</span>
          <h2>We are here to help you take the next step.</h2>
          <p>
            Still have a question? We would be glad to hear from you and point
            you in the right direction.
          </p>
          <a className="text-link" href="/contact">
            Contact us <Arrow />
          </a>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
