import api from '../../services/api';

export async function generateResumePDF(
  interviewReportId
) {
  const response = await api.post(
    `/interview/resume/pdf/${interviewReportId}`,
    {},
    {
      responseType: 'blob',
    }
  );

  return response.data;
}