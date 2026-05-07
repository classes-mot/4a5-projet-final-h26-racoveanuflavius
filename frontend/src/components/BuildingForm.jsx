import { dangerOptions, imageOptions } from "../constants/buildingOptions";
import "./forms.css"

export default function BuildingForm({ form, onChange, onSubmit, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="building-form">

      <input
        name="nom"
        value={form.nom}
        onChange={onChange}
        placeholder="Nom"
        required
      />

      <input
        name="adresse"
        value={form.adresse}
        onChange={onChange}
        placeholder="Adresse"
        required
      />

      <select name="danger" value={form.danger} onChange={onChange}>
        <option value="">Sélectionner un danger</option>
        {dangerOptions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        name="dateAbandon"
        type="date"
        value={form.dateAbandon}
        onChange={onChange}
      />

      <select name="imageUrl" value={form.imageUrl} onChange={onChange}>
        <option value="">Sélectionne une image</option>
        {imageOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <textarea
        name="histoire"
        value={form.histoire}
        onChange={onChange}
        placeholder="Histoire"
      />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
