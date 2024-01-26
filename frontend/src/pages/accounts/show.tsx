import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    EmailField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Username</Title>
            <TextField value={record?.username} />
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Password</Title>
            <TextField value={record?.password} />
            <Title level={5}>Role</Title>
            <TextField value={record?.role} />
            <Title level={5}>Date Created</Title>
            <DateField value={record?.date_created} />
            <Title level={5}>Time Created</Title>
            <TextField value={record?.time_created} />
        </Show>
    );
};
