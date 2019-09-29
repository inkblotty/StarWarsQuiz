import axios from 'axios';

const OUR_API_BASE = 'http://localhost:8080/api';

export const getGeneratedQuiz = async () => {
  try {
    const response = await axios.get(`${OUR_API_BASE}/newQuiz`);
    return response;
  } catch (err) {
    throw err;
  }
};
