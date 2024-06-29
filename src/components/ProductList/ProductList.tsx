import { Button, Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../../redux/api/productApi";
import { Product } from "../../types/productType";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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
      className: "text-left text-lg font-medium text-gray-700 px-4 py-2",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-left text-lg text-gray-600 px-4 py-2",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "text-left text-lg text-gray-600 px-4 py-2",
    },
    {
      title: "Action",
      key: "action",
      render: (_: React.MouseEvent<HTMLButtonElement>, record: Product) => (
        <Button
          className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
          onClick={() => navigate(`/product/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="mx-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">
        Products Data
      </h1>
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
            row: (props) => (
              <tr className="hover:bg-gray-100 border-b border-gray-200">
                {props.children}
              </tr>
            ),
          },
        }}
        className="min-w-full bg-white border border-gray-200 rounded-lg"
      />
    </div>
  );
};

export default ProductList;
