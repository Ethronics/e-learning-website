import React from 'react';

const GamificationElements = ({ gamification }) => {
  return (
    <div className="gamification-elements mb-6">
      <h2 className="text-2xl font-semibold mb-2">Gamification Elements</h2>
      <div>
        <h3 className="text-lg font-semibold">Badges:</h3>
        <ul>
          {gamification.badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Progress Milestones:</h3>
        <ul>
          {gamification.progressMilestones.map((milestone, index) => (
            <li key={index}>{milestone.section}: {milestone.milestone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamificationElements;
