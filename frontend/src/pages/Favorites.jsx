import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Favorites.css"

export default function Favorites() {
  const { token, userId } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/favorites`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors du chargement");
        return;
      }

      setFavorites(data.favorites || data);
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (batimentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/favorites/${batimentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Erreur lors de la suppression");
        return;
      }

      setFavorites((prev) => prev.filter((b) => b._id !== batimentId));
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="favorites-container">
      <h1>Mes favoris</h1>

      <div className="favorites-grid">
        {favorites.map((b) => (
          <div key={b._id} className="favorite-card">
            <img src={`/assets/${b.imageUrl}`} alt={b.nom} />

            <h2>{b.nom}</h2>

            <button onClick={() => removeFavorite(b._id)}>Retirer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
