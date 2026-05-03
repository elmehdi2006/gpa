import { API_URL, getToken } from "./config";

const getEmployees = async (is_archived) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${API_URL}/employee?is_archived=${is_archived}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error",
      };
    }

    return {
      success: true,
      message: data.message || "success",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Network error",
      errors: err,
    };
  }
};

export { getEmployees };
