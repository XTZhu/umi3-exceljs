import React from 'react';
import { Button, Table } from 'antd';
import ExcelJS from 'exceljs';
import { jsxToString } from './utils';
// import { createExcelWorker } from '../worker/workerUtils';
// import SampleWorker from '@/pages/worker/sample.worker.js';

const columns = [
  {
    title: <span style={{ color: 'red' }}>Name</span>,
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
  const exportExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Sheet1');
      // 添加表头
      sheet.columns = columns.map((col) => ({
        header: jsxToString(col.title),
        key: col.dataIndex,
      }));

      // 根据 data 填充 Excel 数据
      data.forEach((row) => {
        sheet.addRow(row);
      });

      // 生成 Excel 文件并发送回主线程
      const buffer = await workbook.xlsx.writeBuffer();
      // download file
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'export.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export Excel:', error);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#777' }}>
      <Table columns={columns} dataSource={data} />
      <Button onClick={() => exportExcel()}>Export</Button>
    </div>
  );
};

export default ExcelTable;
