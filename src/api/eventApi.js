export const getEventsFromDB = async () => {
  const url = `http://localhost:3001/api/events`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

//  Event in die Datenbank speichern
export const setEventToDB = async (event) => {
  const url = "http://localhost:3001/api/events";
  const token = localStorage.getItem("token");
  const storedToken = token ? JSON.parse(token) : null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${storedToken}` }),
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while creating event", error);
    throw error;
  }
};
