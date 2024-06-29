import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: number }>();
  return (
    <div>
      <h1>Detail Page {id}</h1>
    </div>
  );
};

export default ProductDetailPage;
