import React, { useEffect, useState } from 'react';
import { fetchAllContent } from '../../api';
import { MapPin, Dumbbell, Baby, Trees, Activity, Building, Plus } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchAllContent();
        setContent(data);
      } catch (err) {
        console.error("Failed to load content", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading || !content) return <div className="loader" style={{marginTop: '20vh'}}></div>;

  const { hero, about, amenities, developer, faqs } = content;

  return (
    <div className="home-container animate-fade-in">
      <nav className="navbar">
        <div className="logo">
          {/* Placeholder for Logo */}
          <div style={{color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '24px'}}>LOGO</div>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Overview</a>
          <a href="#">Connectivities</a>
          <a href="#">Amenities</a>
          <a href="#">Floor Plans</a>
          <a href="#">Developer</a>
          <a href="#">Contact</a>
          <a href="/admin" style={{ color: "var(--primary-dark)", fontWeight: "bold" }}>Admin Login</a>
        </div>
        <button className="btn-primary">Enquiry Now</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-text-overlay">
            <p style={{fontSize: '14px', letterSpacing: '1px', marginBottom: '5px'}}>THINKING</p>
            <h1>{hero?.title || "OF A FANTASTIC VICINITY?"}</h1>
            <div className="hero-features">
              <span>{hero?.subtitle_left}</span>
              <span>{hero?.subtitle_right}</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-logo-large">
            <Trees size={48} color="var(--primary-dark)" />
            <div style={{letterSpacing: '3px', fontSize: '14px', marginTop: '10px', color: '#666'}}>VIGHNAHARTA</div>
            <h2>{hero?.project_name}</h2>
          </div>
          
          <div className="pricing-container">
            <div className="pricing-box">
              <h3>{hero?.bhk1_title}</h3>
              <p style={{color: '#666', textDecoration: 'line-through'}}>@ {hero?.bhk1_old_price}</p>
              <div className="price">{hero?.bhk1_price}</div>
              <p style={{fontSize: '12px', color: '#888'}}>onwards</p>
            </div>
            <div className="pricing-box">
              <h3>{hero?.bhk2_title}</h3>
              <p style={{color: '#666', textDecoration: 'line-through'}}>@ {hero?.bhk2_old_price}</p>
              <div className="price">{hero?.bhk2_price}</div>
              <p style={{fontSize: '12px', color: '#888'}}>onwards</p>
            </div>
          </div>
          
          <div className="location-pin">
            <MapPin color="red" />
            <span style={{maxWidth: '250px', textAlign: 'center', lineHeight: '1.4'}}>{hero?.location}</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="curved-bg section-padding about-section">
        <div className="about-images">
          <img className="circle-img img1" src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" alt="Interior" />
          <img className="circle-img img2" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" alt="Patio" />
          <img className="circle-img img3" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" alt="Gym" />
        </div>
        <div className="about-content">
          <h2>{about?.title}</h2>
          <p>{about?.p1}</p>
          <p>{about?.p2}</p>
          <button className="btn-primary" style={{marginTop: '20px'}}>Download Brochure</button>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="amenities-left">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Building Roof" />
        </div>
        <div className="amenities-right">
          <h2>{amenities?.title}</h2>
          <p>{amenities?.description}</p>
          <div className="amenities-grid">
            {amenities?.items?.map(item => (
              <div className="amenity-item" key={item.id}>
                <div className="icon-box">
                  {item.icon === 'gym' && <Dumbbell size={32} />}
                  {item.icon === 'kids' && <Baby size={32} />}
                  {item.icon === 'jogging' && <Activity size={32} />}
                  {item.icon === 'yoga' && <Building size={32} />}
                </div>
                <span style={{fontSize: '14px', fontWeight: '500'}}>{item.name}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop: '40px', textAlign: 'center'}}>
            <button className="btn-primary" style={{background: 'var(--btn-gradient)'}}>View more</button>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="dev-section">
        <h2>{developer?.title}</h2>
        <p style={{maxWidth: '800px', margin: '20px auto', color: 'var(--text-light)', lineHeight: '1.6'}}>{developer?.description}</p>
        <div className="stats-grid">
          {developer?.stats?.map(stat => (
            <div className="stat-item" key={stat.id}>
              <div className="stat-value">{stat.value}</div>
              <div style={{fontSize: '12px', marginTop: '5px'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 style={{textAlign: 'center', marginBottom: '40px'}}>{faqs?.title}</h2>
        <div className="faq-list">
          {faqs?.items?.map(item => (
            <div className="faq-item" key={item.id}>
              <span>{item.question}</span>
              <Plus size={20} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
