import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../components/ProductList/ProductList";
import EditProductPage from "../pages/EditProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "./product/:id/edit",
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default routes;
