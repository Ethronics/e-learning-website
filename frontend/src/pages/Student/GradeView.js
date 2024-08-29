import React, { useState, useEffect } from "react";
import Navigation from '../../components/student/Common/Navbar';
import Footer from '../../components/home/Footer';
import axios from "axios";

function GradeView() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [studentResults, setStudentResults] = useState({});
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch courses and student results from db.json
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json");
        setCourses(response.data.courses);
        setStudentResults(response.data.studentResults);
        setFilteredCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter courses based on the selected category
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.type === selectedCategory)
      );
    }
  }, [selectedCategory, courses]);

  useEffect(() => {
    // Fetch student results for the selected course
    if (selectedCourseId && studentResults[selectedCourseId]) {
      const courseResults = studentResults[selectedCourseId];
      const studentData = courseResults.find((s) => s.id === 1); // Assuming single student with ID 1 for simplicity
      setStudent(studentData);
    }
  }, [selectedCourseId, studentResults]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedCourseId(null); // Reset course selection when category changes
  };

  const handleCourseChange = (e) => {
    setSelectedCourseId(parseInt(e.target.value));
  };

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  return (
    <div>
            <Navigation />
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Grades</h1>

      {/* Course Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">
          Select Course Curriculum
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Curriculums</option>
          <option value="Technology">Full-Stack Development</option>
          <option value="Mathematics">Data Science and Machine Learning</option>
          <option value="Science">UX/UI Design</option>
        </select>
      </div>

      {/* Course Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Select Course</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedCourseId || ""}
          onChange={handleCourseChange}
          disabled={!filteredCourses.length}
        >
          <option value="">Select a course</option>
          {filteredCourses.map((course) => (
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
            <p>Category: {selectedCourse.type}</p>
          </div>
        )}
      </div>

      {/* Student Results */}
      {student && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Grades for {student.name}
          </h2>
          <table className="min-w-full border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Exam Score (Out of 50)</th>
                <th className="py-2 px-4 border">
                  Assignment Score (Out of 30)
                </th>
                <th className="py-2 px-4 border">Quiz Score (Out of 20)</th>
                <th className="py-2 px-4 border">Final Grade (Out of 100)</th>
                <th className="py-2 px-4 border">Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">{student.exam}</td>
                <td className="py-2 px-4 border">{student.assignment}</td>
                <td className="py-2 px-4 border">{student.quiz}</td>
                <td className="py-2 px-4 border">
                  {student.finalGrade || "-"}
                </td>
                <td className="py-2 px-4 border">{student.comment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* No results message */}
      {selectedCourseId && !student && (
        <p className="text-red-500">No results found for the selected course.</p>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default GradeView;