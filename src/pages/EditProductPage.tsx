import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/shared/Loader";
import {
  useGetProductcategoryQuery,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "../redux/api/productApi";
import { Category, Product, UpdateProductPayload } from "../types/productType";

const { Option } = Select;

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<Product>();
  const { data: product, isLoading: isProductLoading } =
    useGetProductsByIdQuery(Number(id));
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetProductcategoryQuery();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const onFinish = async (values: UpdateProductPayload) => {
    console.log("Submitted values:", values);
    try {
      await updateProduct({ id: Number(id), payload: values });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isProductLoading || isCategoriesLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input className="w-full px-4 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea
            className="w-full px-4 py-2 border rounded-md"
            rows={4}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber className="w-full" min={0} step={0.01} />
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <InputNumber className="w-full" min={0} max={100} step={0.1} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please input the rating!" }]}
          >
            <InputNumber className="w-full" min={0} max={5} step={0.1} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input the stock!" }]}
          >
            <InputNumber className="w-full" min={0} />
          </Form.Item>
        </div>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input className="w-full px-4 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select className="w-full">
            {categories?.map((category: Category) => (
              <Option key={category.slug} value={category.slug}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[{ required: true, message: "Missing rating" }]}
                  >
                    <InputNumber min={1} max={5} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    rules={[{ required: true, message: "Missing comment" }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProductPage;
