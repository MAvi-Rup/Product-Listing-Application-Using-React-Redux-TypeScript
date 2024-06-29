export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  thumbnail: string;
  returnPolicy: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  minimumOrderQuantity: number;
}

export interface Review {
  rating: number;
  comment: string;
}

export interface UpdateProductPayload {
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  rating?: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsData {
  products: Product[];
  total: number;
}
