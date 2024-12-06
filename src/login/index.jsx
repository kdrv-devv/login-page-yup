import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name cannot exceed 30 characters")
      .required("Name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .max(30, "Last name cannot exceed 30 characters")
      .required("Last name is required"),
    email: Yup.string()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email address"
      )
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("userData", JSON.stringify(values));
      alert("Data saved successfully!");
    },
  });

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Name"
          validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
          help={formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          validateStatus={formik.errors.lastName && formik.touched.lastName ? "error" : ""}
          help={formik.touched.lastName && formik.errors.lastName}
        >
          <Input
            name="lastName"
            placeholder="Enter your last name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
