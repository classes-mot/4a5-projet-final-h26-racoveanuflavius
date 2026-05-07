import { getBuildings } from "../../controllers/buildingController.js";

describe("getBuildings Controller", () => {
  it("retourne la liste des bâtiments", async () => {
    const mockBuildings = [{ nom: "Usine" }, { nom: "Hôpital" }];

    const req = {
      db: {
        Building: {
          find: jest.fn().mockResolvedValue(mockBuildings)
        }
      }
    };

    const res = {
      json: jest.fn()
    };

    await getBuildings(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBuildings);
  });
});
