const serverURL = "https://server-ac6c.onrender.com";

const createResponse = (status, data = null) => ({
  status,
  data,
});

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${serverURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  let data = null;
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  }

  return createResponse(response.status, data);
};

// get all users api : called by dashboard component when it opens
export const getAllUsersAPI = async () => {
  return await request("/users");
};

// add user api : called by manage component when add button is pressed
export const addUserAPI = async (userData) => {
  return await request("/add", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// edit user api : called by manage component when edit button is pressed
export const editUserAPI = async (userId, userData) => {
  return await request(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

// delete user api : called by dashboard component when delete button is pressed
export const deleteUserAPI = async (userId) => {
  return await request(`/users/${userId}`, {
    method: "DELETE",
  });
};
