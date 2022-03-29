import axios from 'axios';

const API_URL = '/api/questionnaires/';

// Create new questionnaire
const createQuestionnaire = async (questionnaireData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, questionnaireData, config);
  return response.data;
};

// Get all questionnaires
const getQuestionnaires = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a questionnaire
const deleteQuestionnaire = async (questionnaireId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + questionnaireId, config);
  return response.data;
};

// Update a questionnaire
const updateQuestionnaire = async (questionnaireId, questionnaireData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + questionnaireId, questionnaireData, config);
  return response;
};

const questionnaireService = {
  createQuestionnaire,
  getQuestionnaires,
  deleteQuestionnaire,
  updateQuestionnaire,
};
export default questionnaireService;
