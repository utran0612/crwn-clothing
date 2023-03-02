import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

import { Link } from "react-router-dom";
export const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        {/* can use either <Link> or useNavigate(). The difference is:
         1. <Link> is used to render CLICKABLE links that navigate to a specified location
         2. useNavigate() is used to PROGRAMMATICALLY navigate to a specified location, 
         p.s: talked to chatGPT: https://chat.openai.com/chat/8bdd0bf5-1b5e-4e0c-994a-6b3975caa4ae (*/}
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>

      <div className="preview">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
