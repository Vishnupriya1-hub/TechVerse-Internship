import React, { useState } from 'react';
import './index.css';
import profileImg from './assets/profile.jpg';

function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const skills = ['React', 'JavaScript', 'Python', 'Node.js', 'MongoDB', 'GitHub'];

  return (
    <div className="app-container">
      <div className="card-container">
        
        <div className="card-header"></div>

        
        <div className="avatar-wrapper">
          <img 
            src={profileImg} 
            alt="Vishnu Priya S" 
            className="avatar-img"
          />
        </div>

      
        <div className="card-body">
          <h2 className="profile-name">Vishnu Priya S</h2>
          <p className="profile-title">AI & Data Science Student</p>

          
          <div className="info-badges">
            <span className="info-badge location-badge">
              <svg className="badge-icon icon-coral" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Kollam, Kerala
            </span>
            <span className="info-badge college-badge">
              <svg className="badge-icon icon-amber" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3Z"/><path d="M12 22v-4h-4v4Z"/><path d="M18 18.8v-4l4-1.8v6a1 1 0 0 1-1 1h-3Z"/></svg>
              Mentor Engineering College
            </span>
          </div>

          
          <p className="profile-bio">
            Passionate Full Stack Developer interested in React, Python, 
            Artificial Intelligence, and building modern web applications with 
            clean UI and strong functionality.
          </p>

          
          <button className={`toggle-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span>{isOpen ? 'Hide Full Profile' : 'View Full Profile'}</span>
            <svg 
              className={`arrow-icon ${isOpen ? 'rotated' : ''}`} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          
          <div className={`expandable-content ${isOpen ? 'show' : ''}`}>
            
            <div className="section-divider"></div>
            
            
            <div className="skills-heading">Technical Skills</div>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>

            {/* Course & Academic Focus Grid */}
            <div className="details-box">
              <div className="details-row">
                <svg className="details-icon icon-indigo" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <div>
                  <span className="details-label">Course: </span>
                  <span className="details-value">B.Tech CSE - AI & Data Science</span>
                </div>
              </div>
              <div className="details-row">
                <svg className="details-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <div>
                  <span className="details-label">Focus: </span>
                  <span className="details-value">Full Stack Development</span>
                </div>
              </div>
            </div>

          </div> 

        </div>
      </div>
    </div>
  );
}

export default App;