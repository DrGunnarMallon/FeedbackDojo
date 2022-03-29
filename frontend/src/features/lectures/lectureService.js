import axios from 'axios';

const API_URL = '/api/lectures/';

// Create new lecture
const createLecture = async (lectureData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, lectureData, config);
  return response.data;
};

// Get all lectures
const getLectures = async (token, courseId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      courseId,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a lecture
const deleteLecture = async (lectureId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + lectureId, config);
  return response.data;
};

const lectureService = {
  createLecture,
  getLectures,
  deleteLecture,
};
export default lectureService;
