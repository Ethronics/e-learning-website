import React from "react";

const LessonContentViewer = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
      <div className="prose max-w-none">
        {content.type === "video" && (
          <>
            <video controls className="w-full rounded-lg mb-4">
              <source src={content.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Text display section for video */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Video Description</h3>
              <p>{content.description}</p>
            </div>
          </>
        )}
        {content.type === "text" && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Text Content</h3>
            <div dangerouslySetInnerHTML={{ __html: content.body }} />
          </div>
        )}
        {content.type === "material" && (
          <>
            {/* Display the material download link */}
            <div className="mt-4">
              <a
                href={content.materialLink}
                download
                className="text-blue-600 hover:underline"
              >
                Download Material
              </a>
            </div>
            {/* Text display section for material */}
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-2">Material Description</h3>
              <p>{content.materialDescription}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonContentViewer;
