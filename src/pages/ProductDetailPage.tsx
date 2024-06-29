import { Button, Card, Image, Rate } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "../redux/api/productApi";
import { Product, Review } from "../types/productType";

const ProductDetailPage: React.FC = () => {
  interface ProductQueryResult {
    data: Product;
    isLoading: boolean;
    error: unknown;
  }
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsByIdQuery<ProductQueryResult>(Number(id));

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading product details
      </div>
    );
  if (!product)
    return <div className="text-center py-8">Product not found</div>;

  const {
    thumbnail,
    title,
    description,
    category,
    brand,
    price,
    rating,
    discountPercentage,
    stock,
    tags,
    returnPolicy,
    shippingInformation,
    availabilityStatus,
    reviews,
    minimumOrderQuantity,
  } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={thumbnail}
            alt={title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {category}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> {brand}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Price:</span> ${price}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Discount:</span>{" "}
            {discountPercentage}%
          </div>
          <div className="mb-4">
            <span className="font-semibold">Stock:</span> {stock}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Minimum Order Quantity:</span>{" "}
            {minimumOrderQuantity}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Tags:</span>
            {tags.map((tag: string, index: number) => (
              <span key={index} className="text-blue-500 ml-2">
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Rating:</span>
            <Rate disabled defaultValue={rating} />
          </div>
          <div className="mb-4">
            <span className="font-semibold">Return Policy:</span> {returnPolicy}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Shipping Information:</span>{" "}
            {shippingInformation}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Availability:</span>{" "}
            {availabilityStatus}
          </div>
          <Button type="primary" className="mt-4">
            <Link to={`/product/${id}/edit`}>Edit Product</Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews && reviews.length > 0 ? (
          reviews.map((review: Review, index: number) => (
            <Card key={index} className="mb-4">
              <p className="mb-2">{review.comment}</p>
              <Rate disabled defaultValue={review.rating} />
            </Card>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
