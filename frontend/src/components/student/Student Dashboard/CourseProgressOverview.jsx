import React from "react";

const CourseProgressOverview = ({ courses }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Course Progress Overview</h2>
      {courses.map((course) => (
        <div key={course.id} className="mb-4">
          <h3 className="font-semibold">{course.title}</h3>
          <div className="progress">
            <div
              className="progress-bar bg-green-500"
              role="progressbar"
              style={{ width: `${course.progress}%` }}
            >
              {course.progress}%
            </div>
          </div>
          <p className="mt-2">
            Next Lesson: {course.nextLesson} | Deadline: {course.deadline}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseProgressOverview;
