import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Buildings.css";


export default function Buildings() {
  const { token, userId } = useContext(AuthContext);

  const [buildings, setBuildings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("http://localhost:3000/buildings", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Erreur lors du chargement");
          return;
        }

        setBuildings(data.buildings || data);
      } catch (err) {
        setError("Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const addFavorite = async (buildingId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/favorites/${buildingId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message);
        return;
      }
      console.log("Favori ajouté !");
    } catch (err) {
      console.error("Erreur serveur");
    }
  };

  return (
    <div>
      <h1>Liste des bâtiments</h1>

      {buildings.length === 0 && <p>Aucun bâtiment trouvé.</p>}

      {token && (
        <button
          className="new-building-btn"
          onClick={() => (window.location.href = "/buildings/new")}
        >
          Nouveau bâtiment
        </button>
      )}

      <div className="cards-container">
        {buildings.map((b) => (
          <div className="building-card" key={b._id}>
            <img
              src={`/assets/${b.imageUrl}`}
              alt={b.nom}
              className="building-image"
            />

            <Link to={`/buildings/${b._id}`}>
              <h3>{b.nom}</h3>
            </Link>

            <p>{b.adresse}</p>
            <p>
              Date d'abandon :{" "}
              {b.dateAbandon ? b.dateAbandon.split("T")[0] : "Non renseignée"}
            </p>
            {token && (
              <button onClick={() => addFavorite(b._id)}>
                Ajouter aux favoris
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
