import React from 'react';

const ProfilePhotoAndBio = ({ photo, bio, background, teachingPhilosophy, socialLinks }) => {
  return (
    <div className="profile-photo-and-bio">
      <img src={photo} alt="Instructor" className="profile-photo" />
      <h2 className="text-2xl font-bold">{bio.name}</h2>
      <p className="text-lg">{bio.description}</p>
      <p><strong>Background:</strong> {background}</p>
      <p><strong>Teaching Philosophy:</strong> {teachingPhilosophy}</p>
      <div className="social-links">
        {socialLinks.map(link => (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfilePhotoAndBio;
