import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    TagField,
    EmailField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const AccountList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="username" title="Username" />
                <Table.Column
                    dataIndex={["email"]}
                    title="Email"
                    render={(value: string) => <EmailField value={value} />}
                    width="100%"
                />
                <Table.Column dataIndex="password" title="Password" />
                <Table.Column dataIndex="role" title="Role" />
                <Table.Column
                    dataIndex={["date_created"]}
                    title="Date Created"
                    // render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="time_created" title="Time Created" />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
