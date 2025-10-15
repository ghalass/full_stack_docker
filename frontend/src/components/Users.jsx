"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Simuler un délai serveur de 2 secondes
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await axios.get("/backend_app/users");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (users.length === 0) return <p>Aucun user trouvé</p>;

  return (
    <>
      <h3>Liste des users [{users?.length}]</h3>
      <div className="mx-2">
        <table className="table table-striped table-hover table-responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="align-middle ">
                <td>{u.name}</td>
                <td>{u.age}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary rounded-pill">
                    E
                  </button>
                  <button className="btn btn-sm btn-outline-danger rounded-pill">
                    D
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
