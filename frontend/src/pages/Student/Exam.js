import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ExamPage = () => {
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Fetch exam data
  useEffect(() => {
    axios
      .get("/exa.json")
      .then((response) => {
        setExamData(response.data.exam);
        setTimer(response.data.exam.time_limit);
        setFlags(new Array(response.data.exam.questions.length).fill(false));
      })
      .catch((error) => console.error(error));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isExamStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleExamSubmission();
    }
  }, [isExamStarted, timer]);

  // Fullscreen and resize handling
  useEffect(() => {
    const handleResize = () => {
      if (isExamStarted) {
        handleExamSubmission();
        alert("The exam has been canceled due to screen resizing.");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExamStarted]);

  const handleStartExam = () => {
    setIsExamStarted(true);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    setFlags((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[questionId - 1] = true;
      return newFlags;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleToggleFlag = (index) => {
    setFlags((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[index] = !newFlags[index];
      return newFlags;
    });
  };

  const handleExamSubmission = () => {
    setIsExamSubmitted(true);
    setShowFeedbackModal(true);
  };

  const handleConfirmSubmission = () => {
    setShowSubmitModal(false);
    handleExamSubmission();
  };

  const handleCancelSubmission = () => {
    setShowSubmitModal(false);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // Send feedback to the server or handle it as needed
    axios.post("/api/submit-feedback", { feedback })
      .then(response => {
        setFeedbackSubmitted(true);
        setFeedback("");
      })
      .catch(error => {
        console.error("Error submitting feedback:", error);
      });
  };

  if (!examData) {
    return <div>Loading...</div>;
  }

  if (isExamSubmitted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Exam Submitted Successfully!</h2>
          <p className="mt-4">You will receive your results shortly.</p>
        </div>

        {/* Feedback Modal */}
        <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Exam Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Thank you for completing the exam!</p>
            <p>Your answers have been submitted successfully. You will receive feedback soon.</p>

            {/* Feedback Form */}
            {!feedbackSubmitted ? (
              <div className="mt-4">
                <h5>We value your feedback</h5>
                <textarea
                  className="form-control mt-2"
                  rows="4"
                  placeholder="Provide your feedback here..."
                  value={feedback}
                  onChange={handleFeedbackChange}
                ></textarea>
                <button className="btn btn-primary mt-3" onClick={handleFeedbackSubmit}>
                  Submit Feedback
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p>Thank you for your feedback!</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              onClick={() => setShowFeedbackModal(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  return (
    <div className="container-fluid mx-auto p-8 h-screen">
      {!isExamStarted ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">{examData.title}</h1>
          <h2 className="text-4xl font-bold mb-6">Exam Instructions</h2>
          <p className="text-lg mb-8">{examData.instructions}</p>
          <button className="btn btn-primary" onClick={handleStartExam}>
            Start Exam
          </button>
        </div>
      ) : (
        <div className="flex h-full">
          {/* Flag and Question List on the Left */}
          <div className="w-1/5 bg-gray-100 p-4 border-r-2">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            <div className="grid grid-cols-2 gap-4">
              {examData.questions.map((_, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded ${
                    flags[index]
                      ? "bg-green-200"
                      : flags[index] === false
                      ? "bg-red-200"
                      : "bg-white"
                  } cursor-pointer`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  Q{index + 1}
                  <span
                    className={`ml-2 inline-block w-4 h-4 rounded-full ${
                      flags[index] ? "bg-red-600" : "bg-gray-300"
                    }`}
                    onClick={() => handleToggleFlag(index)}
                  ></span>
                </div>
              ))}
            </div>
          </div>

          {/* Question and Answers on the Right */}
          <div className="w-4/5 p-4 relative">
            {/* Timer */}
            <div className="absolute top-4 right-4 bg-gray-200 text-gray-800 px-4 py-2 rounded">
              <span>
                Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                {timer % 60}
              </span>
            </div>

            {/* Question Display */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="text-lg">
                {examData.questions[currentQuestionIndex].question}
              </p>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              {examData.questions[currentQuestionIndex].type ===
                "multiple-choice" && (
                <div>
                  {examData.questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <div key={index} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={
                            answers[examData.questions[currentQuestionIndex].id] === option
                          }
                          onChange={() =>
                            handleAnswerChange(
                              examData.questions[currentQuestionIndex].id,
                              option
                            )
                          }
                        />
                        <label className="form-check-label">{option}</label>
                      </div>
                    )
                  )}
                </div>
              )}

              {examData.questions[currentQuestionIndex].type ===
                "true-false" && (
                <div>
                  {examData.questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <div key={index} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={
                            answers[examData.questions[currentQuestionIndex].id] === option
                          }
                          onChange={() =>
                            handleAnswerChange(
                              examData.questions[currentQuestionIndex].id,
                              option
                            )
                          }
                        />
                        <label className="form-check-label">{option}</label>
                      </div>
                    )
                  )}
                </div>
              )}

              {examData.questions[currentQuestionIndex].type === "written" && (
                <div>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={
                      answers[examData.questions[currentQuestionIndex].id] || ""
                    }
                    onChange={(e) =>
                      handleAnswerChange(
                        examData.questions[currentQuestionIndex].id,
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex === examData.questions.length - 1
                }
              >
                Next
              </button>
            </div>

            {/* Preview and Submit Buttons */}
            {currentQuestionIndex === examData.questions.length - 1 && (
              <div className="mt-8 text-center">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Preview Answers
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit Exam
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview and Submit Confirmation Modal */}
      <Modal show={showSubmitModal} onHide={handleCancelSubmission}>
        <Modal.Header closeButton>
          <Modal.Title>Review Your Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {examData.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h5>
                Question {index + 1}: {question.question}
              </h5>
              <p>Your Answer: {answers[question.id] || "Not answered"}</p>
            </div>
          ))}
          <p>
            Are you sure you want to submit the exam? You won't be able to make
            any changes after submission.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCancelSubmission}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirmSubmission}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExamPage;
