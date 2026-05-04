import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { addUserAPI, editUserAPI, getAllUsersAPI } from "../services/allAPI";

const getUserId = (user) => user.id || user._id;
const normalizeEmail = (email) => email.trim().toLowerCase();

function Manage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    salary: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    const getSelectedUser = async () => {
      if (!id) {
        return;
      }

      try {
        const result = await getAllUsersAPI();
        if (result.status >= 200 && result.status < 300) {
          const selectedUser = result.data.find(
            (user) => String(getUserId(user)) === String(id),
          );

          if (selectedUser) {
            setUserData({
              username: selectedUser.username ?? "",
              email: selectedUser.email ?? "",
              salary: selectedUser.salary ?? "",
            });
          } else {
            setErrorMessage("User not found");
          }
        }
      } catch (err) {
        console.log("Error fetching selected user:", err);
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getSelectedUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isLoading || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const usersResult = await getAllUsersAPI();
      if (usersResult.status >= 200 && usersResult.status < 300) {
        const userAlreadyExists = usersResult.data.some(
          (user) =>
            String(getUserId(user)) !== String(id) &&
            normalizeEmail(user.email || "") === normalizeEmail(userData.email),
        );

        if (userAlreadyExists) {
          setErrorMessage("User already exists");
          return;
        }
      }

      const cleanedUserData = {
        username: userData.username.trim(),
        email: userData.email.trim(),
        salary: userData.salary,
      };

      const result = id
        ? await editUserAPI(id, cleanedUserData)
        : await addUserAPI(cleanedUserData);

      if (result.status >= 200 && result.status < 300) {
        navigate("/dashboard");
      } else if (result.status === 409) {
        setErrorMessage("User already exists");
      } else if (result.status === 404) {
        setErrorMessage("User not found");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log("Error saving user:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setErrorMessage("");
    setUserData({
      username: "",
      email: "",
      salary: "",
    });
  };

  return (
    <div className="container text-center my-5">
      <h1>{id ? "Edit User" : "Add User"}</h1>

      <form className="my-5 border rounded p-5" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <div className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            required
            value={userData.username}
            onChange={(e) => {
              setErrorMessage("");
              setUserData({ ...userData, username: e.target.value });
            }}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={userData.email}
            onChange={(e) => {
              setErrorMessage("");
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>

        {/* SALARY */}
        <div className="mb-3">
          <Form.Control
            type="number"
            placeholder="Salary"
            required
            min="0"
            value={userData.salary}
            onChange={(e) => {
              setErrorMessage("");
              setUserData({ ...userData, salary: e.target.value });
            }}
          />
        </div>

        {errorMessage && <p className="text-danger fw-bold">{errorMessage}</p>}

        <div className="mb-5">
          <button
            type="submit"
            className="btn btn-info me-3"
            disabled={isLoading || isSubmitting}
          >
            {isLoading
              ? "LOADING..."
              : isSubmitting
                ? "SAVING..."
                : id
                  ? "UPDATE USER"
                  : "ADD USER"}
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}

export default Manage;
