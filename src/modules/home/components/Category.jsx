export const categoryNames = {
  1: "Política",
  2: "Economía",
  3: "Deportes",
  4: "Tecnología",
  5: "Entretenimiento",
  6: "Salud",
  7: "Educación",
  8: "Ciencia",
  9: "Arte",
  10: "Internacional",
  11: "Música"
};

export const getCategoryName = (categoryId) => {
  return categoryNames[categoryId] || `Categoría ${categoryId}`;
};

export const getAllCategories = () => {
  return Object.entries(categoryNames).map(([id, name]) => ({
    id: Number(id),
    name
  }));
};