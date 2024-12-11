import React, { useState, useEffect } from "react";
import axios from "axios";

function GradeSubmision() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    // Fetch course and student data from api.json
    axios
      .get("/db1.json")
      .then((response) => {
        setCourses(response.data.courses);
        setSelectedCourseId(response.data.courses[0]?.id || null);
        setStudents(response.data.studentResults[response.data.courses[0]?.id] || []);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Handle course change and update student results accordingly
  const handleCourseChange = (courseId) => {
    setSelectedCourseId(courseId);
    axios
      .get("/db1.json")
      .then((response) => {
        setStudents(response.data.studentResults[courseId] || []);
      })
      .catch((error) => {
        console.error("Error fetching student data: ", error);
      });
  };

  // Handle grade and comment changes
  const handleGradeChange = (studentId, type, value) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, [type]: Number(value) }
          : student
      )
    );
  };

  // Calculate final grade based on exam, assignment, and quiz scores
  const calculateFinalGrade = (student) => {
    const { exam, assignment, quiz } = student;
    const finalGrade =
      (exam / 50) * 50 + (assignment / 30) * 30 + (quiz / 20) * 20;
    return finalGrade.toFixed(2); // Final grade out of 100
  };

  // Handle form submission
  const handleSubmit = () => {
    const hasInvalidGrades = students.some(
      (student) =>
        student.exam === "" ||
        student.exam < 0 ||
        student.exam > 50 ||
        student.assignment === "" ||
        student.assignment < 0 ||
        student.assignment > 30 ||
        student.quiz === "" ||
        student.quiz < 0 ||
        student.quiz > 20
    );

    if (hasInvalidGrades) {
      setError(
        "All grades must be valid numbers: exam (0-50), assignment (0-30), quiz (0-20)."
      );
    } else {
      setError("");
      setStudents(
        students.map((student) => ({
          ...student,
          finalGrade: calculateFinalGrade(student),
        }))
      );
      setConfirmationModalOpen(true); // Open confirmation modal
    }
  };

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Grade Exam Results</h1>

      {/* Course Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Select Course</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedCourseId}
          onChange={(e) => handleCourseChange(parseInt(e.target.value))}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.type})
            </option>
          ))}
        </select>

        {/* Display course details */}
        {selectedCourse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
            <p>Term: {selectedCourse.term}</p>
            <p>Instructor: {selectedCourse.instructor}</p>
            <p>Maximum Score: {selectedCourse.maxScore}</p>
          </div>
        )}
      </div>

      {/* Class Results and Grading */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Class Results - {selectedCourse?.type} Course
        </h2>
        <table className="min-w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Student Name</th>
              <th className="py-2 px-4 border">Exam Score (Out of 50)</th>
              <th className="py-2 px-4 border">Assignment Score (Out of 30)</th>
              <th className="py-2 px-4 border">Quiz Score (Out of 20)</th>
              <th className="py-2 px-4 border">Final Grade (Out of 100)</th>
              <th className="py-2 px-4 border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border">{student.name}</td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={student.exam}
                    onChange={(e) =>
                      handleGradeChange(student.id, "exam", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={student.assignment}
                    onChange={(e) =>
                      handleGradeChange(student.id, "assignment", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={student.quiz}
                    onChange={(e) =>
                      handleGradeChange(student.id, "quiz", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border">
                  {student.finalGrade || calculateFinalGrade(student)}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={student.comment}
                    onChange={(e) =>
                      handleGradeChange(student.id, "comment", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit Grades
      </button>

      {/* Confirmation Modal */}
      {confirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Grade Submission</h2>
            <p>Are you sure you want to submit these grades?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setConfirmationModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmationModalOpen(false);
                  // Implement your final submission logic here
                  alert("Grades submitted successfully!");
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeSubmision;
