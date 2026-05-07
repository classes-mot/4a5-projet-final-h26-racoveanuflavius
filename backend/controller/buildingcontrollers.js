export const getBuildings = async (req, res) => {
  const buildings = await req.db.Building.find();
  res.json(buildings);
};
