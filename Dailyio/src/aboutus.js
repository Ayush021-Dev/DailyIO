import React from "react";

const AboutUs = () => {
  return (
    <div className="aboutus-main-wrapper">
      <div className="aboutus-gradient-background">
        <div className="aboutus-content-container">
          <header className="aboutus-header"><br></br>
            <h1 className="aboutus-title">About DailyIO</h1>
            <h3 className="aboutus-subtitle">Everyday Life, Simpler</h3>
          </header>
          
          <section className="aboutus-section aboutus-intro-section">
            <div className="aboutus-card">
              <p className="aboutus-text">
                Welcome! We're thrilled to tell you about DailyIO, a platform born
                from a simple yet powerful observation: in today's fast-paced world,
                we all need a reliable digital sanctuary that brings together
                everything we need for our daily lives.
              </p>
            </div>
          </section>
          
          <section className="aboutus-section aboutus-mission-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">Our Mission</h2>
              <div className="aboutus-divider"></div>
              <p className="aboutus-text">
                At DailyIO, we're committed to simplifying your daily digital
                experience. Our mission is to create a seamless, all-in-one platform
                that serves as your daily companion, helping you stay informed,
                organized, and entertained without the complexity of juggling
                multiple applications.
              </p>
            </div>
          </section>

          <section className="aboutus-section aboutus-features-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">What Sets Us Apart</h2>
              <div className="aboutus-divider"></div>
              <p className="aboutus-text">
                What makes DailyIO unique is our thoughtful integration of essential
                daily services. Instead of switching between countless apps and
                websites, we've created a cohesive ecosystem where everything you
                need is just a click away.
              </p>
            </div>
          </section>
          
          <section className="aboutus-section aboutus-vision-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">Our Vision</h2>
              <div className="aboutus-divider"></div>
              <p className="aboutus-text">
                Looking ahead, we see DailyIO becoming an indispensable part of
                people's daily routines. We're constantly evolving, taking user
                feedback seriously to refine and expand our offerings.
              </p>
            </div>
          </section>
          
          <section className="aboutus-section aboutus-core-features-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">Core Features</h2>
              <div className="aboutus-divider"></div>
              <ul className="aboutus-feature-list">
                <li className="aboutus-feature-item">Personalized dashboard that adapts to your needs</li>
                <li className="aboutus-feature-item">Local weather forecast alongside breaking news</li>
                <li className="aboutus-feature-item">Real-time stock market updates and currency conversion tools</li>
                <li className="aboutus-feature-item">Smart task management system</li>
                <li className="aboutus-feature-item">Selection of quick, engaging mini-games</li>
              </ul>
            </div>
          </section>
          
          <section className="aboutus-section aboutus-ux-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">User Experience</h2>
              <div className="aboutus-divider"></div>
              <p className="aboutus-text">
                We've paid meticulous attention to design, using a carefully
                selected color palette and typography that reduces eye strain during
                extended use.
              </p>
            </div>
          </section>
          
          <section className="aboutus-section aboutus-team-section">
            <div className="aboutus-card">
              <h2 className="aboutus-section-title">Meet the Contributors</h2>
              <div className="aboutus-divider"></div>
              <div className="aboutus-contributors-container">
                <div className="aboutus-contributor-card">
                  <h4 className="aboutus-contributor-name">Punya K Sirohi</h4>
                </div>
                <div className="aboutus-contributor-card">
                  <h4 className="aboutus-contributor-name">Ayush Shrivastava</h4>
                </div>
                <div className="aboutus-contributor-card">
                  <h4 className="aboutus-contributor-name">Diya Kurian</h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <style jsx>{`
        .aboutus-main-wrapper {
          font-family: 'Arial', sans-serif;
          color: #ffffff;
        }
        
        .aboutus-gradient-background {
          background: linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D);
          background-size: 400% 400%;
          min-height: 100vh;
          padding: 40px 0;
          animation: aboutusGradientBG 15s ease infinite;
        }
        
        @keyframes aboutusGradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .aboutus-content-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .aboutus-header {
          text-align: center;
          margin-bottom: 40px;
          padding-top: 20px;
        }
        
        .aboutus-title {
          font-size: 48px;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .aboutus-subtitle {
          font-size: 24px;
          font-weight: normal;
          opacity: 0.9;
        }
        
        .aboutus-section {
          margin-bottom: 30px;
        }
        
        .aboutus-card {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 25px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .aboutus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }
        
        .aboutus-section-title {
          font-size: 28px;
          margin-bottom: 15px;
          color: #ffffff;
        }
        
        .aboutus-divider {
          height: 3px;
          width: 60px;
          background-color: rgba(255, 255, 255, 0.4);
          margin-bottom: 20px;
        }
        
        .aboutus-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 0;
        }
        
        .aboutus-feature-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .aboutus-feature-item {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          padding-left: 20px;
        }
        
        .aboutus-feature-item:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #FFD700;
        }
        
        .aboutus-feature-item:last-child {
          border-bottom: none;
        }
        
        .aboutus-contributors-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;
        }
        
        .aboutus-contributor-card {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 15px 25px;
          text-align: center;
          flex: 1;
          min-width: 200px;
          max-width: 250px;
          transition: transform 0.3s ease;
        }
        
        .aboutus-contributor-card:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.25);
        }
        
        .aboutus-contributor-name {
          font-size: 18px;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .aboutus-title {
            font-size: 36px;
          }
          
          .aboutus-subtitle {
            font-size: 20px;
          }
          
          .aboutus-section-title {
            font-size: 24px;
          }
          
          .aboutus-contributor-card {
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;