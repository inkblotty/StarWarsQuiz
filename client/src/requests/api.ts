import axios from 'axios';

const OUR_API_BASE = 'http://localhost:8080/api';

export const getGeneratedQuiz = async () => {
  const response = await axios.get(`${OUR_API_BASE}/newQuiz`);
  console.log(response);
  return {};
};
