import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUserAPI, getAllUsersAPI } from "../services/allAPI";

function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserId = (user) => user.id || user._id;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await getAllUsersAPI();
        if (result.status >= 200 && result.status < 300) {
          setAllUsers(result.data);
        }
      } catch (err) {
        console.log("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteUserAPI(id);
      if (result.status >= 200 && result.status < 300) {
        setAllUsers(allUsers.filter((user) => String(getUserId(user)) !== String(id)));
      }
    } catch (err) {
      console.log("Error deleting user:", err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <h1>Welcome ADMIN</h1>
        <Link to="/add" className="btn btn-primary">
          + ADD USER
        </Link>
      </div>

      <div className="m-5">
        <h3 className="text-center text-warning">ALL USERS LIST</h3>

        <table className="table table-hover my-5 shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>SALARY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading users...
                </td>
              </tr>
            ) : allUsers.length > 0 ? (
              allUsers.map((user) => {
                const userId = getUserId(user);

                return (
                  <tr key={userId}>
                    <td className="text-break">{userId}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>${user.salary}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <Link
                          to={`/edit/${userId}`}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(userId)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
