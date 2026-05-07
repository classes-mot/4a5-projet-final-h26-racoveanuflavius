import { formatDate } from "../../utils/formatDate.js";

describe("formatDate()", () => {
  it("retourne une date formatée YYYY-MM-DD", () => {
    const result = formatDate("2024-05-01T10:00:00Z");
    expect(result).toBe("2024-05-01");
  });
});
