import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BuildingForm from "../components/BuildingForm";

export default function EditBuilding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:3000/buildings/${id}`);
      const data = await res.json();

      setForm({
        nom: data.nom,
        adresse: data.adresse,
        histoire: data.histoire,
        danger: data.danger,
        dateAbandon: data.dateAbandon.split("T")[0],
        imageUrl: data.imageUrl
      });
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/buildings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...form,
      }),
    });

    navigate(`/buildings/${id}`);
  };

  if (!form) return <p>Chargement...</p>;

  return (
    <div className="form-container">
      <h1>Modifier un bâtiment</h1>

      <BuildingForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
