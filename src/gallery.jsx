import { useEffect, useState } from "react";

const imageModules = import.meta.glob("./assets/*.{jpeg,jpg,png,jfif}", {
  eager: true,
  import: "default",
  query: "?url",
});

const galleryImages = Object.entries(imageModules)
  .filter(
    ([path]) =>
      !/\/(?:logo|logoo|about-page|about-section-img|hero-img|women)\.png$/i.test(
        path,
      ),
  )
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true }),
  )
  .map(([, src], index) => ({
    src,
    alt: `People Seva Foundation community photo ${index + 1}`,
  }));

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      } else if (event.key === "ArrowLeft") {
        setActiveImageIndex(
          (current) =>
            (current - 1 + galleryImages.length) % galleryImages.length,
        );
      } else if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % galleryImages.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  const showPreviousImage = () => {
    setActiveImageIndex(
      (current) => (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % galleryImages.length);
  };

  return (
    <div className="gallery-page">
      <section className="gallery-heading">
        <p className="eyebrow">People Seva Foundation · Our moments</p>
        <h1>Stories from our community</h1>
        <p>
          A collection of moments, people, and activities that are part of the
          People Seva Foundation journey.
        </p>
        <span className="gallery-photo-count">
          {galleryImages.length} photos
        </span>
      </section>

      <section className="gallery-grid" aria-label="Foundation photo gallery">
        {galleryImages.map((image, index) => (
          <button
            type="button"
            className="gallery-card"
            key={image.src}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Open photo ${index + 1} of ${galleryImages.length}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="gallery-card-caption">
              {/* <span>People Seva Foundation</span> */}
            </span>
          </button>
        ))}
      </section>

      {activeImageIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${activeImageIndex + 1} of ${galleryImages.length}`}
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close photo"
            onClick={() => setActiveImageIndex(null)}
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-arrow previous"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
          >
            ‹
          </button>
          <figure
            className="gallery-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].alt}
            />
            <figcaption>
              Photo {activeImageIndex + 1} of {galleryImages.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="gallery-lightbox-arrow next"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
