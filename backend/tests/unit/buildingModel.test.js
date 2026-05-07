import Building from "../../models/Building.js";

describe("Building Model", () => {
  it("crée un bâtiment valide", () => {
    const building = new Building({
      nom: "Hôpital abandonné",
      adresse: "123 Rue X",
      danger: "Élevé",
      histoire: "Construit en 1950",
      imageUrl: "hopital.jpg"
    });

    expect(building.nom).toBe("Hôpital abandonné");
    expect(building.danger).toBe("Élevé");
  });
});
