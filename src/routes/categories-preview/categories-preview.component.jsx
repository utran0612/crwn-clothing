import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

export const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {/* Object.keys loop through the object (or dictionary in Python) and return an array of all keys */}
      {/* Object is like a dictionary in Python! */}
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          products={categoriesMap[title]}
        />
      ))}
    </>
  );
};

export default CategoriesPreview;
