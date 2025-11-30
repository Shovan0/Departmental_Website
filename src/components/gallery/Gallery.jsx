import React from "react";
import "./Gallery.css";

// Import images directly
import gallery1 from "../../assets/gallery/gallery1.jpg";
import gallery2 from "../../assets/gallery/gallery2.jpg";
import gallery3 from "../../assets/gallery/gallery3.jpg";
import gallery4 from "../../assets/gallery/gallery4.jpg";
import gallery5 from "../../assets/gallery/gallery5.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h2>Campus Life</h2>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt={`Campus Life ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
    