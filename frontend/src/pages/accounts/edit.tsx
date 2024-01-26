import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Radio } from "antd";

export const AccountEdit: React.FC<IResourceComponentsProps> = () => {
   const { formProps, saveButtonProps, queryResult } = useForm();

   const accountsData = queryResult?.data?.data;

   return (
      <Edit saveButtonProps={saveButtonProps}>
         <Form {...formProps} layout="vertical">
            <Form.Item
               label="Id"
               name={["id"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input readOnly disabled />
            </Form.Item>
            <Form.Item
               label="Username"
               name={["username"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="Email"
               name={["email"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="Password"
               name={["password"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="Role"
               name={["role"]}
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
               label="Date Created"
               name={["date_created"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input readOnly disabled />
            </Form.Item>
            <Form.Item
               label="Time Created"
               name={["time_created"]}
               rules={[
                  {
                     required: true,
                  },
               ]}
            >
               <Input readOnly disabled />
            </Form.Item>
         </Form>
      </Edit>
   );
};
