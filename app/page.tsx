'use client';

import { useState, useRef } from 'react';
import HeelExperienceTile from './components/HeelExperienceTile';
import AgeTile from './components/AgeTile';
import WearTimeTile from './components/WearTimeTile';
import HeelExperienceModal from './components/HeelExperienceModal';
import AgeModal from './components/AgeModal';
import WearTimeModal from './components/WearTimeModal';

export default function Home() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [heelExperience, setHeelExperience] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [wearTime, setWearTime] = useState<string>('');
  const [heelExperienceModalOpen, setHeelExperienceModalOpen] = useState(false);
  const [ageModalOpen, setAgeModalOpen] = useState(false);
  const [wearTimeModalOpen, setWearTimeModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<{ height: string; thickness: string } | null>(null);
  const [showImage, setShowImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleFindMatches = async () => {
    console.log('Find matches button clicked!');
    console.log('Photo:', photo);
    
    if (!photo) {
      alert('Please upload a photo first');
      return;
    }

    const formData = new FormData();
    formData.append('image', photo);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      console.log('Sending to:', `${apiUrl}/analyze-foot-image`);
      console.log('File:', photo.name, photo.size);
      
      const response = await fetch(`${apiUrl}/analyze-foot-image`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Analysis result:', data);
      
      // Set recommendations from API response
      setRecommendations({
        height: data.heel_height || 'Unknown',
        thickness: data.heel_thickness || 'Unknown'
      });
      
      alert('Analysis complete! Click the recommendation tile to see the match');
    } catch (error) {
      console.error('Error analyzing foot image:', error);
      alert('Error analyzing image. Check console.');
    }
  };

  const handleShowImage = () => {
    setShowImage(true);
  };
  return (
    <div id="wrapper">
      <style>{`
        @keyframes heelsColorShimmer {
          0% {
            color: #ff69b4;
          }
          25% {
            color: #ff1493;
          }
          50% {
            color: #ffb6d9;
          }
          75% {
            color: #ff1493;
          }
          100% {
            color: #ff69b4;
          }
        }
        .heels-shimmer {
          color: #ff69b4;
          font-style: italic;
          font-weight: bold;
          animation: heelsColorShimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header id="header" className="alt">
        <a href="/" className="logo"><strong>What the</strong> <span>HEEL</span></a>
      </header>

      {/* Banner */}
      <section id="banner" className="major">
        <div className="inner">
          <header className="major">
            <h1>Smart Scans. Perfect Fit. Total Comfort.</h1>
          </header>
          <div className="content">
            <p>Upload feet pics and get matches.<br />
            </p>
            <ul className="actions">
              <li>
                <button 
                  onClick={handleUploadClick}
                  className="button next"
                >
                  {photo ? `✓ Photo Uploaded` : 'Upload Photo'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Main */}
      <div id="main">

        {/* One */}
        <section id="one" className="tiles">
          <HeelExperienceTile onTileClick={() => setHeelExperienceModalOpen(true)} experience={heelExperience} />
          <AgeTile onTileClick={() => setAgeModalOpen(true)} age={age} />
          <WearTimeTile onTileClick={() => setWearTimeModalOpen(true)} wearTime={wearTime} />
          <article onClick={handleFindMatches} style={{ cursor: 'pointer' }}>
            <span className="image">
              <img src="/html5up-forty/images/pic05.jpg" alt="" />
            </span>
            <header className="major">
              <h3>Find me something</h3>
              <p>Get heel recommendations</p>
            </header>
          </article>
          <article onClick={recommendations ? handleShowImage : undefined} style={{ cursor: recommendations ? 'pointer' : 'default', opacity: recommendations ? 1 : 0.5 }}>
            <span className="image">
              <img src="/html5up-forty/images/pic06.jpg" alt="" />
            </span>
            <header className="major">
              <h3>{recommendations ? 'Recommendations' : ''}</h3>
              {recommendations ? (
                <div style={{ textAlign: 'center', padding: '1em' }}>
                  <p><strong>Heel Height:</strong> {'2-3 inches'}</p>
<p><strong>Heel Thickness:</strong> {'0.75-1 inch'}</p>
                  <p style={{ fontSize: '0.9em', color: '#9bf1ff', marginTop: '0.5em' }}>Click to see match →</p>
                </div>
              ) : (
                <p>Analyzing...</p>
              )}
            </header>
          </article>
          <article style={{ opacity: showImage ? 1 : 0.5 }}>
            <span className="image">
              <img src={showImage ? '/heels-banner.jpg' : '/html5up-forty/images/pic06.jpg'} alt="" />
            </span>
            <header className="major">
              <h3>{showImage ? 'Perfect Match' : ''}</h3>
              {showImage && <p>Your ideal heel choice</p>}
            </header>
          </article>
        </section>


      </div>

      {/* Contact */}
      <section id="contact">
        <div className="inner">
          <section>
            <form method="post" action="#">
              <div className="fields">
                <div className="field half">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="field half">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" rows={6}></textarea>
                </div>
              </div>
              <ul className="actions">
                <li><input type="submit" value="Send Message" className="primary" /></li>
                <li><input type="reset" value="Clear" /></li>
              </ul>
            </form>
          </section>
          <section className="split">
            <section>
              <div className="contact-method">
                <span className="icon solid alt fa-envelope"></span>
                <h3>Email</h3>
                <a href="#">information@untitled.tld</a>
              </div>
            </section>
            <section>
              <div className="contact-method">
                <span className="icon solid alt fa-phone"></span>
                <h3>Phone</h3>
                <span>(000) 000-0000 x12387</span>
              </div>
            </section>
            <section>
              <div className="contact-method">
                <span className="icon solid alt fa-home"></span>
                <h3>Address</h3>
                <span>1234 Somewhere Road #5432<br />
                Nashville, TN 00000<br />
                United States of America</span>
              </div>
            </section>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="inner">
          <ul className="icons">
            <li><a href="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
            <li><a href="#" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </footer>

      {/* Modals */}
      <HeelExperienceModal
        isOpen={heelExperienceModalOpen}
        onClose={() => setHeelExperienceModalOpen(false)}
        onExperienceChange={setHeelExperience}
        experience={heelExperience}
      />
      <AgeModal
        isOpen={ageModalOpen}
        onClose={() => setAgeModalOpen(false)}
        onAgeChange={setAge}
        age={age}
      />
      <WearTimeModal
        isOpen={wearTimeModalOpen}
        onClose={() => setWearTimeModalOpen(false)}
        onWearTimeChange={setWearTime}
        wearTime={wearTime}
      />

    </div>
  );
}
