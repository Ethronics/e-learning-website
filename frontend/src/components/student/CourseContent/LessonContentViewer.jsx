import React from "react";

const LessonContentViewer = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
      <div className="prose max-w-none">
        {/* This can be a video, text, or any content type */}
        {content.type === "video" && (
          <video controls className="w-full rounded-lg">
            <source src={content.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {content.type === "text" && <div dangerouslySetInnerHTML={{ __html: content.body }} />}
        {/* Add more content types as needed */}
      </div>
    </div>
  );
};

export default LessonContentViewer;
