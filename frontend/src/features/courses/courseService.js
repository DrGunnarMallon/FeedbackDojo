import axios from 'axios';

const API_URL = '/api/courses/';

// Create new course
const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, courseData, config);
  return response.data;
};

// Get all courses
const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a course
const deleteCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + courseId, config);
  return response.data;
};

const courseService = {
  createCourse,
  getCourses,
  deleteCourse,
};
export default courseService;
