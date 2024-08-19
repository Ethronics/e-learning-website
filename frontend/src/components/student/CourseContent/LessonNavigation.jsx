import React from "react";

const LessonNavigation = ({ lessons, currentLessonId }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Lessons</h2>
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <a
              href={`#lesson-${lesson.id}`}
              className={`text-blue-600 hover:underline ${lesson.id === currentLessonId ? 'font-bold' : ''}`}
            >
              {lesson.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonNavigation;
