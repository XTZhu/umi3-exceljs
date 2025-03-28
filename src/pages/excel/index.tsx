import React from 'react';
import { Button, Table } from 'antd';
import EXSL from 'exceljs';

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
  const workbook = new EXSL.Workbook();

  const exportExcel = () => {
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = columns.map((column) => ({
      header: column.title,
      key: column.dataIndex,
      width: 20,
    }));
    data.forEach((record) => {
      worksheet.addRow(record);
    });
    downloadExcel();
  };

  const downloadExcel = () => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'export.xlsx';
      a.click();
    });
  };
  return (
    <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#777' }}>
      <Table columns={columns} dataSource={data} />
      <Button onClick={exportExcel}>Export</Button>
    </div>
  );
};

export default ExcelTable;
