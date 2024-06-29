import { Button, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../../redux/api/productApi";
import { Product } from "../../types/productType";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_: React.MouseEvent<HTMLButtonElement>, record: Product) => (
        <Button onClick={() => navigate(`/product/${record.id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Table
      dataSource={data?.products}
      columns={columns}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: data?.total,
        onChange: (newPage) => setPage(newPage),
      }}
      components={{
        body: {
          row: ProductListItem,
        },
      }}
    />
  );
};

export default ProductList;
