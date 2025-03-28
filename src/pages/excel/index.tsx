import React from 'react';
import { Button, Table } from 'antd';
import { exportExcelWithWorker } from '../worker/workerUtils.js';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const ExcelTable: React.FC = () => {
  const exportExcel = () => {
    exportExcelWithWorker(columns, data, 'export.xlsx');
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#777' }}>
      <Table columns={columns} dataSource={data} />
      <Button onClick={exportExcel}>Export</Button>
    </div>
  );
};

export default ExcelTable;
