export interface Product {
  id: number;
  title: string;
  descrition: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: object;
  reviews: Review[];
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewName: string;
  reviewEmail: string;
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
