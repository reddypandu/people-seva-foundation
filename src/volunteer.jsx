import { Arrow } from "./navbar";
import { contact } from "./contact-info";

export default function Volunteer() {
  return (
    <section className="inner-page">
      <div className="inner-heading">
        <p className="eyebrow">Volunteer with us</p>
        <h1>There is room for you in this movement.</h1>
        <p>
          Offer a little of your time, talent, or attention. Together, we can
          make support feel closer and more possible.
        </p>
      </div>
      <div className="volunteer-content">
        <div className="volunteer-list">
          <div>
            <span>01</span>
            <h2>Share your skill</h2>
            <p>
              Teach, mentor, create, organize, or help us tell a better story.
            </p>
          </div>
          <div>
            <span>02</span>
            <h2>Give your time</h2>
            <p>
              Be part of an event, a workshop, or a meaningful conversation.
            </p>
          </div>
          <div>
            <span>03</span>
            <h2>Grow the circle</h2>
            <p>
              Bring one more person who believes that change is shared work.
            </p>
          </div>
        </div>
        <a
          className="button button-dark"
          href={`mailto:${contact.email}?subject=Volunteer with People Seva`}
        >
          Write to volunteer <Arrow />
        </a>
      </div>
    </section>
  );
}
