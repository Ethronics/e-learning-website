import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../../components/instructor/Common/Navbar'
import ProgressTracking from '../../components/instructor/ProfileandSettings/ProgressTracking'

const StudentDetail = () => {
  const { courseId, studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch('/inst1.json');
        const data = await response.json();
        const enrolledStudents = data['enrolled-students'][courseId] || [];
        const studentDetails = enrolledStudents.find(student => student.id === studentId);

        if (studentDetails) {
          setStudent(studentDetails);
        } else {
          console.error('Student not found');
        }
      } catch (error) {
        console.error('Error fetching student details', error);
      }
    };

    fetchStudent();
  }, [courseId, studentId]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navigation />
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
      <img src={student.profileImage} alt={student.name} className="h-20 w-20 rounded-full mt-4" />
        <h2 className="text-2xl font-bold mb-4">{student.name}</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Enrollment Date:</strong> {student.enrollmentDate}</p>
        
        {/* Display Progress */}
        <div className="mt-4">
        <ProgressTracking progress={student.progres} />
          <h3 className="text-xl font-semibold mb-2">Progress</h3>
          <p><strong>Completed Assignments:</strong> {student.progress.completedAssignments}</p>
          <p><strong>Projects Completed:</strong> {student.progress.completedProjects}</p>
          <p><strong>Activities Participated:</strong> {student.progress.activitiesParticipated}</p>
          <p><strong>Course Completion:</strong> {student.progress.courseCompletion}%</p>
        </div>

        {/* Display Assignments */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Assignments</h3>
          {student.assignments.length > 0 ? (
            <ul>
              {student.assignments.map((assignment, index) => (
                <li key={index} className="border-b py-2">
                  <p><strong>Title:</strong> {assignment.title}</p>
                  <p><strong>Status:</strong> {assignment.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments found.</p>
          )}
        </div>

        {/* Display Projects */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {student.projects.length > 0 ? (
            <ul>
              {student.projects.map((project, index) => (
                <li key={index} className="border-b py-2">
                  <p><strong>Title:</strong> {project.title}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        {/* Display Activities */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Activities</h3>
          {student.activities.length > 0 ? (
            <ul>
              {student.activities.map((activity, index) => (
                <li key={index} className="border-b py-2">
                  <p><strong>Title:</strong> {activity.title}</p>
                  <p><strong>Participation Date:</strong> {activity.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities found.</p>
          )}
        </div>

        <div className="mt-4">
          <Link to={`/courses/${courseId}/students/${studentId}/grade`} className="text-blue-500 underline">
            Submit Grade
          </Link>
          <br />
          <Link to={`/courses/${courseId}/students/${studentId}/grades`} className="text-blue-500 underline">
            View Grades
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDetail;
