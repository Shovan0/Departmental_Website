import "./Statistics.css";

function Statistics() {
  return (
    <section className="stats-section">
      <h2 className="stats-title">Department at a Glance</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>1200+</h3>
          <p>Students</p>
        </div>

        <div className="stat-card">
          <h3>35+</h3>
          <p>Faculty Members</p>
        </div>

        <div className="stat-card">
          <h3>10</h3>
          <p>Advanced Laboratories</p>
        </div>

        <div className="stat-card">
          <h3>50+</h3>
          <p>Research Publications</p>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
