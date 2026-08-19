import { contact } from "./contact-info";

export default function Contact() {
  return (
    <section className="inner-page">
      <div className="inner-heading">
        <p className="eyebrow">Contact People Seva</p>
        <h1>Let’s start a conversation.</h1>
        <p>
          Whether you need support, want to collaborate, or simply want to know
          more, our door is open.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-details">
          <p className="eyebrow">Find us here</p>
          <h2>Good work starts with a hello.</h2>
          <div className="detail">
            <span>Visit</span>
            <p>{contact.address}</p>
          </div>
          <div className="detail">
            <span>Call</span>
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>
              {contact.phone}
            </a>
          </div>
          <div className="detail">
            <span>Write</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            How can we help?
            <textarea
              rows="4"
              placeholder="Tell us a little about what brings you here..."
            />
          </label>
          <button className="button button-dark" type="submit">
            Send message{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
