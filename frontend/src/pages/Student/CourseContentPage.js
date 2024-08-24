import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cont.css';
import Navigation from '../../components/student/Common/Navbar';
// import Footer from '../../components/home/Footer';
import LessonNavigation from '../../components/student/CourseContent/LessonNavigation';
import LessonContentViewer from '../../components/student/CourseContent/LessonContentViewer';
import DownloadMaterials from '../../components/student/CourseContent/DownloadMaterials';
import AssignmentSubmission from '../../components/student/CourseContent/AssignmentSubmission';
import DiscussionSection from '../../components/student/CourseContent/DiscussionSection';

import PracticalSessionFeedback from '../../components/student/CourseContent/PracticalSessionFeedback';

const CourseContentPage = () => {
    const [courseData, setCourseData] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  
    useEffect(() => {
      axios.get("/ap1.json").then((response) => {
        setCourseData(response.data.courseContent);
      });
    }, []);
  
    if (!courseData) {
      return <div>Loading...</div>;
    }
  
    const handleNextLesson = () => {
      setCurrentLessonIndex((prevIndex) => Math.min(prevIndex + 1, courseData.lessons.length - 1));
    };
  
    const handlePreviousLesson = () => {
      setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
  
    const currentLesson = courseData.lessons[currentLessonIndex];
    const progressPercentage = ((currentLessonIndex + 1) / courseData.lessons.length) * 100;
  
    return (
      <div className="container mx-auto p-4">
        <Navigation />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {courseData.courseTitle}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <LessonNavigation lessons={courseData.lessons} currentLessonId={currentLesson.id} />
          <div className="col-span-3">
            <LessonContentViewer content={currentLesson.content} />
            <div className="flex justify-between my-4">
              <button
                onClick={handlePreviousLesson}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                disabled={currentLessonIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextLesson}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={currentLessonIndex === courseData.lessons.length - 1}
              >
                Next
              </button>
            </div>
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Progress: {progressPercentage.toFixed(0)}%</p>
            </div>
            <DownloadMaterials materials={currentLesson.materials} />
            <AssignmentSubmission assignment={currentLesson.assignment} />
            <DiscussionSection comments={currentLesson.discussions} lessonId={currentLesson.id} />
            <PracticalSessionFeedback feedback={currentLesson.practicalFeedback} />
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseContentPage;