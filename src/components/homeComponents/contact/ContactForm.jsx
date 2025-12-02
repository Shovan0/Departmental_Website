import "./ContactForm.css";

function ContactForm() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-container">

        {/* Left Side Info */}
        <div className="contact-info">
          <h3>Department of Informantion Technology</h3>
          <p>MAKAUT, HARINGHATA, WEST-BENGAL, INDIA</p>

          <p><strong>Email:</strong> it.department@example.com</p>
          <p><strong>Phone:</strong> +91 000000000</p>
        </div>

        {/* Right Side Form */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

      </div>
    </section>
  );
}

export default ContactForm;
