import { api } from '../api'; // Presumindo que 'api' seja uma instância Axios

export async function fetchEventById(eventId: string) {
  try {
    const response = await api.get(`/events/${eventId}`); // Usando Axios para consistência
    return response.data; // Axios armazena os dados no campo 'data'
  } catch (error) {
    console.error('Erro ao buscar o evento:', error);
    return null;
  }
}
