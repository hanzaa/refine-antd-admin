import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Radio } from "antd";

interface CustomRegisterFormTypes {
   username?: string;
   role?: string;
   email?: string;
   password?: string;
   confirmPassword?: string;
   providerName?: string;
}

export const AccountCreate: React.FC<IResourceComponentsProps> = () => {
   const { formProps, saveButtonProps, onFinish, queryResult } =
      useForm<CustomRegisterFormTypes>();
   const handleOnFinish = (values: CustomRegisterFormTypes) => {
      const { confirmPassword, ...otherValues } = values;
      onFinish(otherValues);
   };
   return (
      <Create saveButtonProps={{ ...saveButtonProps }}>
         <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
            <Form.Item
               name="username"
               label={"Username"}
               rules={[{ required: true }]}
            >
               <Input size="large" placeholder={"Username"} />
            </Form.Item>
            <Form.Item
               name="email"
               label={"Email"}
               rules={[
                  { required: true },
                  {
                     type: "email",
                     message: "Invalid email address",
                  },
               ]}
            >
               <Input size="large" placeholder={"Email"} />
            </Form.Item>
            <Form.Item
               name="role"
               label={"Role"}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Radio.Group>
                  <Radio value="staff">Staff</Radio>
                  <Radio value="pejabat">Pejabat</Radio>
               </Radio.Group>
            </Form.Item>
            <Form.Item
               name="password"
               label={"Password"}
               rules={[{ required: true }]}
               hasFeedback
            >
               <Input type="password" placeholder="●●●●●●●●" size="large" />
            </Form.Item>
            <Form.Item
               name="confirmPassword"
               label={"Confirm Password"}
               hasFeedback
               dependencies={["password"]}
               rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(
                           new Error("Confirm passwords do not match!")
                        );
                     },
                  }),
               ]}
            >
               <Input type="password" placeholder="●●●●●●●●" size="large" />
            </Form.Item>
         </Form>
      </Create>
   );
};
