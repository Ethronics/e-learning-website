import React from 'react';

const SocialMediaLinks = ({ links }) => {
  return (
    <div className="social-media-links">
      <h3 className="text-xl font-bold">Connect with {links.name}</h3>
      <div className="links">
        {links.map(link => (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="mr-4">
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
