import React from 'react';
import { Space, Table, Tag } from 'antd';
const TABLE = ({columns,data}) => <Table columns={columns} dataSource={data} />;
export default TABLE;