export const getEventsFromDB = async () => {
  return {};
};

export const getUserFromDB = async () => {
  return null;
};

export const setEventToDB = async () => {};

export const signUpUserToDB = async (user) => {
  const url = "http://localhost:3001/api/users";
  const userData = user;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const signInUserToDB = async (user) => {
  const url = "http://localhost:3001/api/auth/login";
  const userData = user;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteUserFromDB = async (id) => {
  const url = `http://localhost:3001/api/users/${id}`;
  const token = localStorage.getItem("token");
  const storedToken = token ? JSON.parse(token) : null;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${storedToken}` }),
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
