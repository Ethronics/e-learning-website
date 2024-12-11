import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../../components/student/Common/Navbar';
import Footer from '../../components/home/Footer';
import SearchBar from '../../components/student/curriculumcatalog/SearchBar';
import Dropdown from '../../components/student/curriculumcatalog/Dropdown';
import CurriculumList from '../../components/student/curriculumcatalog/CurriculumList';
import CurriculumDetail from '../../components/student/curriculumcatalog/CurriculumDetail';
// import CourseList from '../../components/student/curriculumcatalog/CourseList';
import Pagination from '../../components/student/curriculumcatalog/Pagination';

const CourseCatalog = () => {
    const [curricula, setCurricula] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);
    const { id } = useParams(); // Get the curriculum ID from URL params
    const navigate = useNavigate();
  
    useEffect(() => {
        axios.get('/cur.json')
            .then(response => setCurricula(response.data.curricula))
            .catch(error => console.error('Error fetching curricula:', error));
    }, []);
    
    useEffect(() => {
        if (id) {
            const curriculum = curricula.find(c => c.id === parseInt(id, 10));
            if (curriculum) {
                setCourses(curriculum.courses);
            }
        } else {
            setCourses([]);
        }
    }, [id, curricula]);
    
    useEffect(() => {
        if (selectedCurriculum) {
            console.log('Selected Curriculum:', selectedCurriculum); 
            setFilteredCourses(
                selectedCurriculum.courses.filter((course) =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setSelectedCurriculum();
        }
    }, [selectedCurriculum, searchTerm, filteredCourses]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCurriculumSelect = (id) => {
        navigate(`/curricula/${id}`);
    };

    return (
        <div>
            <Navigation />

            {/* Container for search bar and dropdown */}
            <div className="container mx-auto p-4 flex justify-between items-center">
                {/* Search bar aligned to the left */}
                <div className="w-1/2">
                    <SearchBar onSearch={handleSearch} />
                </div>
                {/* Dropdown aligned to the right */}
                <div className="w-1/2 flex justify-end">
                    <Dropdown curricula={curricula} onSelect={handleCurriculumSelect} />
                </div>
            </div>

            {/* Main content container */}
            <div className="container mx-auto p-4 flex">
                  
                    {id ? (
                        <CurriculumDetail
                            curriculum={curricula.find(c => c.id === parseInt(id, 10))}
                            courses={courses}
                        />
                    ) : (
                        <CurriculumList curricula={curricula} />
                    )}
                    {id && (
                        <div>
                            {/* <CourseList courses={courses} /> */}
                            <Pagination
                                currentPage={1} // or manage pagination state if needed
                                totalPages={Math.ceil(courses.length / 10)}
                                onPageChange={(page) => {
                                    // Handle page change if needed
                                }}
                            />
                        </div>
                    )}
            </div>

            <Footer />
        </div>
    );
};

export default CourseCatalog;
