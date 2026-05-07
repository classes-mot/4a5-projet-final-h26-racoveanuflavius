import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./BuildingHistory.css";

export default function BuildingHistory() {
  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);

  const [building, setBuilding] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await fetch(`http://localhost:3000/buildings/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Erreur");
          return;
        }

        setBuilding(data);
      } catch {
        setError("Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  const addFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/favorites/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      await response.json();
    } catch {}
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!building) return <p>Introuvable</p>;

  return (
    <div className="building-history">
      <div className="left-side">
        <img
          src={`/assets/${building.imageUrl}`}
          alt={building.nom}
          className="building-image"
        />
        {token && <button onClick={addFavorite}>Ajouter aux favoris</button>}
        {token && (
          <button
            onClick={() => (window.location.href = `/buildings/${id}/edit`)}
            className="edit-btn"
          >
            Modifier
          </button>
        )}

        {token && (
          <button
            onClick={async () => {
              await fetch(`http://localhost:3000/buildings/${id}`, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token },
              });
              window.location.href = "/";
            }}
            style={{ backgroundColor: "red" }}
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="right-side">
        <h1>{building.nom}</h1>
        <p>
          <strong>Adresse :</strong> {building.adresse}
        </p>
        <p>
          <strong>Histoire :</strong> {building.histoire}
        </p>
        <p>
          <strong>Date d'abandon :</strong>{" "}
          {building.dateAbandon
            ? building.dateAbandon.split("T")[0]
            : "Non renseignée"}
        </p>
        <p>
          <strong>Type de danger :</strong>{" "}
          {building.danger || "Non renseignée"}
        </p>
      </div>
    </div>
  );
}
