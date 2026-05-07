import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BuildingForm from "../components/BuildingForm";

export default function NewBuilding() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    histoire: "",
    danger: "",
    dateAbandon: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/buildings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...form,
      }),
    });

    navigate("/");
  };

  return (
    <div className="form-container">
      <h1>Ajouter un bâtiment</h1>

      <BuildingForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Créer"
      />
    </div>
  );
}
