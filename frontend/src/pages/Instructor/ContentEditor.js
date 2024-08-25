import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from '../../components/instructor/Common/Navbar'
import { Modal, Button, Form, Card, ListGroup, Tooltip, OverlayTrigger } from "react-bootstrap";

const ContentEditor = () => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [lessonData, setLessonData] = useState({
    title: "",
    video: null,
    videoText: "",
    material: null,
    materialText: "",
    quizLink: "",
  });

  useEffect(() => {
    axios.get("/les.json")
      .then((response) => {
        setLessons(response.data.lessons);
      })
      .catch((error) => {
        console.error("There was an error fetching the lessons!", error);
      });
  }, []);

  const handleShowModal = (index = null) => {
    if (index !== null) {
      setLessonData(lessons[index]);
      setEditingIndex(index);
    } else {
      setLessonData({
        title: "",
        video: null,
        videoText: "",
        material: null,
        materialText: "",
        quizLink: "",
      });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setLessonData({
      ...lessonData,
      [name]: e.target.files[0],
    });
  };

  const handleSaveLesson = () => {
    if (!lessonData.title.trim()) return;

    const updatedLessons = [...lessons];
    if (editingIndex !== null) {
      updatedLessons[editingIndex] = lessonData;
    } else {
      updatedLessons.push({
        ...lessonData,
        id: lessons.length + 1,
        video: lessonData.video ? lessonData.video.name : "",
        material: lessonData.material ? lessonData.material.name : "",
      });
    }
    setLessons(updatedLessons);
    handleCloseModal();
  };

  const handleDeleteLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    console.log("Lessons published:", lessons);
  };

  return (
    <div>
      <Navigation />
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Course Content Editor</h3>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add New Lesson
      </Button>

      <div className="mt-4">
        <h4>Course Lessons</h4>
        <ListGroup>
          {lessons.map((lesson, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{lesson.title}</h5>
                <p>{lesson.videoText}</p>
                <p>{lesson.materialText}</p>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Take the Quiz</Tooltip>}
                >
                  <a href={lesson.quizLink} className="text-primary">
                    Quiz Link
                  </a>
                </OverlayTrigger>
              </div>
              <div>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleShowModal(index)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteLesson(index)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <Button variant="success" className="mt-4" onClick={handlePublish}>
        Publish
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Edit Lesson" : "Add New Lesson"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="lessonTitle">
              <Form.Label>Lesson Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={lessonData.title}
                onChange={handleInputChange}
                placeholder="Enter lesson title"
              />
            </Form.Group>

            <Form.Group controlId="lessonVideo" className="mt-3">
              <Form.Label>Lesson Video</Form.Label>
              <Form.Control
                type="file"
                name="video"
                onChange={handleFileChange}
              />
              {lessonData.video && (
                <Card.Text className="mt-2 text-muted">
                  Selected Video: {lessonData.video.name || lessonData.video}
                </Card.Text>
              )}
            </Form.Group>

            <Form.Group controlId="videoText" className="mt-3">
              <Form.Label>Video Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="videoText"
                value={lessonData.videoText}
                onChange={handleInputChange}
                placeholder="Enter text for the video"
              />
            </Form.Group>

            <Form.Group controlId="lessonMaterial" className="mt-3">
              <Form.Label>Lesson Material</Form.Label>
              <Form.Control
                type="file"
                name="material"
                onChange={handleFileChange}
              />
              {lessonData.material && (
                <Card.Text className="mt-2 text-muted">
                  Selected Material: {lessonData.material.name || lessonData.material}
                </Card.Text>
              )}
            </Form.Group>

            <Form.Group controlId="materialText" className="mt-3">
              <Form.Label>Material Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="materialText"
                value={lessonData.materialText}
                onChange={handleInputChange}
                placeholder="Enter text for the material"
              />
            </Form.Group>

            <Form.Group controlId="quizLink" className="mt-3">
              <Form.Label>Quiz Link</Form.Label>
              <Form.Control
                type="text"
                name="quizLink"
                value={lessonData.quizLink}
                onChange={handleInputChange}
                placeholder="Enter link to the quiz"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveLesson}>
            {editingIndex !== null ? "Update Lesson" : "Save Lesson"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default ContentEditor;
