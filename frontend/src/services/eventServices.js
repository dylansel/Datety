import { getAuthToken } from "./AuthService"; 
const apiUrl = import.meta.env.VITE_API_URL;

export async function addEvent(event) {
    try {
        const response = await fetch(`${apiUrl}/event/addEvent`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                       "Authorization" : `Bearer ${getAuthToken()}` },
            body: JSON.stringify(event)
        })
               
        const data = await response.json();
        const status = response.status;

        console.log(data)

        return[data, status]
    } catch (error) {
        throw new Error("Error al agregar evento")
    }
}

export async function getAllEvents() {
    try {
      const response = await fetch(`${apiUrl}/event/getAllEvents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`,
        },
      });

      const data = await response.json();
      const status = response.status;

      return [data, status];
    } catch (error) {
      console.error(error);
      throw new Error("Error al solicitar usuario");
    }
  }

export async function getEventForWeek(date) {
    try {
      const response = await fetch(`${apiUrl}/event/getEventsForWeek/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`,
        },
      });

      const data = await response.json();
      const status = response.status;

      return [data, status];
    } catch (error) {
      console.error(error);
      throw new Error("Error al solicitar usuario");
    }
  }