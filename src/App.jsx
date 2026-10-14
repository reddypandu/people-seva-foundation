import "./App.css";
import { FloatingActions, Footer, Header } from "./navbar";
import Home from "./home";
import AboutUs from "./about-us";
import Volunteer from "./volunteer";
import Contact from "./contact";
import Blogs from "./blogs";
import Faqs from "./faqs";
import Gallery from "./gallery";
import logo from "./assets/logoo.png";
import { useCallback, useEffect, useState } from "react";

function BrandIntro({ onComplete }) {
  useEffect(() => {
    if (document.readyState === "complete") {
      onComplete();
      return undefined;
    }

    window.addEventListener("load", onComplete, { once: true });
    return () => window.removeEventListener("load", onComplete);
  }, [onComplete]);

  return (
    <div
      className="brand-intro"
      role="status"
      aria-label="Loading People Seva Foundation"
    >
      <div className="brand-intro-content">
        <div className="brand-intro-logo-wrap">
          <img
            className="brand-intro-logo"
            src={logo}
            alt="People Seva Foundation logo"
          />
        </div>
        <p className="brand-intro-name">People Seva Foundation</p>
      </div>
      <button type="button" className="brand-intro-skip" onClick={onComplete}>
        Skip intro
      </button>
    </div>
  );
}

let razorpayScriptPromise;

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) {
        resolve();
      } else {
        razorpayScriptPromise = undefined;
        reject(new Error("Razorpay Checkout could not be loaded."));
      }
    };
    script.onerror = () => {
      razorpayScriptPromise = undefined;
      reject(new Error("Razorpay Checkout could not be loaded."));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

function DonationPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [purpose, setPurpose] = useState("General Fund");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handlePayment = async (event) => {
    event.preventDefault();
    setPaymentError("");

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      setPaymentError(
        "Razorpay is not configured yet. Add your public key as VITE_RAZORPAY_KEY_ID and restart the app.",
      );
      return;
    }

    setIsPaying(true);
    try {
      await loadRazorpayCheckout();
      const checkout = new window.Razorpay({
        key,
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        name: "People Seva Foundation",
        description: `Donation - ${purpose}`,
        prefill: { name, email, contact: phone },
        notes: { purpose },
        theme: { color: "#c8683d" },
        handler: (response) => {
          setPaymentReference(response.razorpay_payment_id);
          setIsPaying(false);
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      });

      checkout.on("payment.failed", (response) => {
        setPaymentError(
          response.error?.description ||
            "The payment could not be completed. Please try again.",
        );
        setIsPaying(false);
      });
      checkout.open();
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Razorpay Checkout could not be opened. Please try again.",
      );
      setIsPaying(false);
    }
  };

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied`);
    } catch {
      setCopyStatus(
        `Could not copy ${label.toLowerCase()}. Please select and copy it manually.`,
      );
    }
  };

  const upiPaymentUri = new URLSearchParams({
    pa: "peopleservafoundation0@*****",
    pn: "Peoples Seva Foundation",
    ...(amount ? { am: amount, cu: "INR" } : {}),
  }).toString();

  return (
    <div className="donation-page-shell">
      <div className="donation-page-card donation-modal-flow">
        {paymentReference ? (
          <div className="donation-payment-success" role="status">
            <span className="donation-success-icon" aria-hidden="true">
              ✓
            </span>
            <p className="donation-step-label">Payment response received</p>
            <h2>Thank you for your support!</h2>
            <p>
              Razorpay returned payment reference{" "}
              <strong>{paymentReference}</strong>. Please keep it for your
              records.
            </p>
            <p className="donation-note">
              This website does not verify payments or issue receipts
              server-side yet. Please contact the foundation to confirm your
              donation.
            </p>
            <a className="donation-primary-button" href="/">
              Back to home
            </a>
          </div>
        ) : (
          <>
            <div className="donation-modal-heading">
              <p className="donation-step-label">
                Step {step} of 2 ·{" "}
                {step === 1 ? "Donation details" : "Your details"}
              </p>
              <h2>
                {step === 1
                  ? "Make a difference today"
                  : "A few details to continue"}
              </h2>
              <p>
                {step === 1
                  ? "Choose an amount and the cause you would like to support."
                  : "Your details help us acknowledge your contribution."}
              </p>
            </div>

            <div
              className="donation-step-progress"
              role="progressbar"
              aria-label={`Step ${step} of 2`}
              aria-valuemin="1"
              aria-valuemax="2"
              aria-valuenow={step}
            >
              <span className={step >= 1 ? "complete" : ""} />
              <span className={step >= 2 ? "complete" : ""} />
            </div>

            {step === 1 ? (
              <div className="donation-step-content">
                <fieldset className="donation-amount-fieldset">
                  <legend>Select amount (INR)</legend>
                  <div className="donation-amount-options">
                    {[500, 1000, 2500, 5000].map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        className={`donation-amount-option ${
                          !isCustomAmount && Number(amount) === preset
                            ? "selected"
                            : ""
                        }`}
                        aria-pressed={
                          !isCustomAmount && Number(amount) === preset
                        }
                        onClick={() => {
                          setAmount(String(preset));
                          setIsCustomAmount(false);
                        }}
                      >
                        ₹{preset.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`donation-custom-option ${isCustomAmount ? "selected" : ""}`}
                    aria-pressed={isCustomAmount}
                    onClick={() => {
                      setIsCustomAmount(true);
                      setAmount("");
                    }}
                  >
                    Custom amount
                  </button>
                </fieldset>

                {isCustomAmount && (
                  <label className="donation-input-label">
                    <span>Enter amount</span>
                    <div className="donation-currency-input">
                      <span aria-hidden="true">₹</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="Enter amount in INR"
                        aria-label="Custom donation amount in rupees"
                        autoFocus
                      />
                    </div>
                  </label>
                )}

                <label className="donation-input-label">
                  <span>Donation purpose</span>
                  <select
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                  >
                    <option>General Fund</option>
                    <option>Education</option>
                    <option>Women Empowerment</option>
                    <option>Healthcare</option>
                    <option>Nutrition</option>
                    <option>Skill Development</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="donation-primary-button"
                  disabled={!amount || Number(amount) <= 0}
                  onClick={() => setStep(2)}
                >
                  Continue to Details
                </button>
              </div>
            ) : (
              <form className="donation-step-content" onSubmit={handlePayment}>
                <div className="donation-summary">
                  <span>Donation · {purpose}</span>
                  <strong>₹{Number(amount).toLocaleString("en-IN")}</strong>
                  <button type="button" onClick={() => setStep(1)}>
                    Change
                  </button>
                </div>

                <div className="donation-details-grid">
                  <label className="donation-input-label">
                    <span>Full name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="donation-input-label">
                    <span>Email address</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="donation-input-label donation-phone-field">
                    <span>Mobile number</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(
                          event.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      placeholder="10-digit mobile number"
                      required
                    />
                  </label>
                </div>

                <p className="donation-secure-note">
                  Your details will be shared with Razorpay to process your
                  donation.
                </p>

                {paymentError && (
                  <p className="donation-payment-error" role="alert">
                    {paymentError}
                  </p>
                )}

                <button
                  type="submit"
                  className="donation-primary-button"
                  disabled={isPaying}
                >
                  {isPaying
                    ? "Opening Razorpay..."
                    : `Pay ₹${Number(amount).toLocaleString("en-IN")} with Razorpay`}
                </button>
                <button
                  type="button"
                  className="donation-back-button"
                  onClick={() => setStep(1)}
                  disabled={isPaying}
                >
                  Back to donation details
                </button>
              </form>
            )}

            <div className="donation-alternative-payments">
              <section
                className="donation-bank-section"
                aria-labelledby="donation-bank-heading"
              >
                <div className="donation-alternative-heading">
                  <span className="donation-payment-icon" aria-hidden="true">
                    ▤
                  </span>
                  <div>
                    <h3 id="donation-bank-heading">Direct Bank Transfer</h3>
                    <p>You can also donate directly to our bank account</p>
                  </div>
                </div>

                <div className="donation-bank-details">
                  <div className="donation-bank-detail">
                    <span>Account Name</span>
                    <strong>People Seva Foundation</strong>
                  </div>
                  <div className="donation-bank-detail">
                    <span>Account Number</span>
                    <strong>****************</strong>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy("************", "Account number")
                      }
                    >
                      {copyStatus === "Account number copied"
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                  <div className="donation-bank-detail">
                    <span>IFSC Code</span>
                    <strong>HDFC000*****</strong>
                    <button
                      type="button"
                      onClick={() => handleCopy("HDFC000*****", "IFSC code")}
                    >
                      {copyStatus === "IFSC code copied" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="donation-bank-detail">
                    <span>Branch</span>
                    <strong>Telangana, Hyderabad</strong>
                  </div>
                </div>

                <div className="donation-bank-thanks">
                  <strong>Thank you for choosing to donate!</strong>
                  <p>
                    After making the transfer, send us a screenshot or
                    transaction details at{" "}
                    <a href="mailto:peopleservafoundation1984@gmail.com">
                      peopleservafoundation1984@gmail.com
                    </a>{" "}
                    or WhatsApp us at{" "}
                    <a
                      href="https://wa.me/919642244005"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +919642244005
                    </a>{" "}
                    to help us acknowledge your contribution.
                  </p>
                </div>
              </section>

              <section
                className="donation-upi-section"
                aria-labelledby="donation-upi-heading"
              >
                <div className="donation-upi-heading">
                  <span className="donation-payment-icon" aria-hidden="true">
                    ▦
                  </span>
                  <h3 id="donation-upi-heading">Scan &amp; Pay with UPI</h3>
                  <p>
                    Support us instantly using any UPI app (GPay, PhonePe,
                    Paytm, etc.)
                  </p>
                </div>
                <div className="donation-upi-content">
                  <a
                    className="donation-qr-link"
                    href={`upi://pay?${upiPaymentUri}`}
                    aria-label="Open this donation in a UPI app"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                        `upi://pay?${upiPaymentUri}`,
                      )}`}
                      alt="People Seva Foundation UPI payment QR code"
                      loading="lazy"
                    />
                  </a>
                  <div className="donation-upi-id">
                    <div>
                      <span>UPI ID</span>
                      <strong>peopleservafoundation0@*****</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy("peopleservafoundation0@*****", "UPI ID")
                      }
                    >
                      {copyStatus === "UPI ID copied" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="donation-upi-powered">
                    Powered by <strong>GPay</strong> &amp; others
                  </p>
                </div>
              </section>

              {copyStatus && (
                <p className="donation-copy-status" role="status">
                  {copyStatus}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const seoByPage = {
  "/": {
    title: "People Seva Foundation | Empowering Women in Hyderabad",
    description:
      "People Seva Foundation works to empower women through education, skill development, employment opportunities and community initiatives, creating a stronger and more inclusive society.",
  },
  "/about": {
    title: "About Us | People Seva Foundation",
    description:
      "Learn how People Seva Foundation supports women through education, mentorship, skills, opportunity, and compassionate community initiatives.",
  },
  "/volunteer": {
    title: "Volunteer with Us | People Seva Foundation",
    description:
      "Join People Seva Foundation as a volunteer and help create education, skill development, employment, and support opportunities for women.",
  },
  "/contact": {
    title: "Contact Us | People Seva Foundation Hyderabad",
    description:
      "Contact People Seva Foundation in Ameerpet, Hyderabad to learn more, request support, volunteer, or collaborate on women empowerment initiatives.",
  },
  "/blogs": {
    title: "Stories and Insights | People Seva Foundation",
    description:
      "Read People Seva Foundation stories, field notes, community updates, and ideas from the people behind our work.",
  },
  "/gallery": {
    title: "Gallery | People Seva Foundation",
    description:
      "Explore photos of People Seva Foundation's community work, people, and activities.",
  },
  "/faqs": {
    title: "FAQs | People Seva Foundation",
    description:
      "Find answers about People Seva Foundation programmes, donations, volunteering, and community support.",
  },
  "/donate": {
    title: "Donate | People Seva Foundation",
    description:
      "Support People Seva Foundation through an online donation, direct bank transfer, or UPI payment.",
  },
};

function updateMetaTag(attribute, value, content) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function App() {
  const page =
    window.location.pathname === "/"
      ? "/"
      : `/${window.location.pathname.split("/")[1]}`;
  const [showBrandIntro, setShowBrandIntro] = useState(
    document.readyState !== "complete",
  );

  useEffect(() => {
    const seo = seoByPage[page] || seoByPage["/"];
    document.title = seo.title;
    updateMetaTag("name", "description", seo.description);
    updateMetaTag("property", "og:title", seo.title);
    updateMetaTag("property", "og:description", seo.description);
  }, [page]);

  const completeBrandIntro = useCallback(() => {
    setShowBrandIntro(false);
  }, []);

  const pages = {
    "/": <Home />,
    "/about": <AboutUs />,
    "/volunteer": <Volunteer />,
    "/contact": <Contact />,
    "/blogs": <Blogs />,
    "/gallery": <Gallery />,
    "/faqs": <Faqs />,
    "/donate": <DonationPage />,
  };

  return (
    <>
      {showBrandIntro && <BrandIntro onComplete={completeBrandIntro} />}
      <Header activePage={page} />
      <main>{pages[page] || <Home />}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
