import { API_URL } from "./config";

export async function loginRequest(formData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Erreur de connexion",
      errors: data.errors || null,
    };
  }

  return data;
}

export async function getMeRequest() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Utilisateur non authentifié",
    };
  }

  return data;
}

export async function logoutRequest() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
