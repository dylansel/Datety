import { setAuthToken, getAuthToken } from "../services/authService";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllSettings() {
    try {
        const response = await fetch(`${apiUrl}/settings/getAllSettings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        return {data:data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar configuración");
    }
}

export async function getSettingsById(id) {
    try {
        const response = await fetch(`${apiUrl}/settings/getSettingsById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        const data = await response.json();
        const status = response.status;
        return {data:data, status};
    } catch (error) {
        console.error(error);
        throw new Error("Error al solicitar la configuración");
    }
}

export async function addSetting(settings) {
    try {
        const response = await fetch(`${apiUrl}/settings/addSetting`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        });
        const data = await response.json();
        const status = response.status;
        if (status === 200 && data.token) {
          setAuthToken(data.token);
        }
        return [data, status];
      } catch (error) {
        console.error(error);
        throw new Error("Error al agregar configuaración");
      }
}

export async function editSetting(settings) {
    try {
        const response = await fetch(`${apiUrl}/settings/editSetting`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(settings),
        });
        const data = await response.json();
        const status = response.status;
        return {data, status};
      } catch (error) {
        console.error(error);
        throw new Error("Error al editar la configuración");
      }
}

export async function removeSetting() {
    try {
      const response = await fetch(`${apiUrl}/settings/removeSetting`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const data = await response.json();
      const status = response.status;
      return [data, status];
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar configuración");
    }
}
