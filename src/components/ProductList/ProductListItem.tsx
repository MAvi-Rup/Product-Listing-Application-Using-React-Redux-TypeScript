import React from "react";

interface ProductListItemProps {
  children: React.ReactNode;
  "data-row-key": string;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  children,
  "data-row-key": dataRowKey,
}) => {
  return (
    <tr data-row-key={dataRowKey} className="product-list-item">
      {children}
    </tr>
  );
};

export default ProductListItem;
