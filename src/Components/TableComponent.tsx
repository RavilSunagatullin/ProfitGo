import React from 'react';
import {Table, TableColumnsType, TablePaginationConfig} from "antd";

interface TableComponentProps {
    columns: TableColumnsType;
    expandable?: {
        expandedRowRender: (record: any) => React.ReactNode;
        defaultExpandedRowKeys: string[];
    };
    data: any[];
    pagination: false | TablePaginationConfig
    header?: () => React.ReactNode;
}
export default function TableComponent({columns, expandable, pagination, data, header}:TableComponentProps) {
    return <>
        <Table dataSource={data} columns={columns} expandable={expandable} pagination={pagination} title={header}/>
    </>;
}
