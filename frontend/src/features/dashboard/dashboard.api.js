import api from '../../services/api';

export async function getInterviews() {
  const response = await api.get('/interview/');

  return response.data;
}