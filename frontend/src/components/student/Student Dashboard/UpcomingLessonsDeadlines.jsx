import React from "react";

const UpcomingLessons = ({ courses }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upcoming Lessons/Deadlines</h2>
      {courses.map((course) => (
        <div key={course.id} className="mb-4">
          <h3 className="font-semibold">{course.title}</h3>
          <p>Next Lesson: {course.nextLesson}</p>
          <p>Deadline: {course.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingLessons;
