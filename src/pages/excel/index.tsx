import React from 'react';
import { Button, Table } from 'antd';
import ExcelJS from 'exceljs';
import { jsxToString } from './utils';
// import { createExcelWorker } from '../worker/workerUtils';
// import SampleWorker from '@/pages/worker/sample.worker.js';
import ExcelWorker from 'worker-loader!@/pages/worker/excel.worker.js';

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
      // 添加表头
      const workerColumns = columns.map((col) => ({
        title: jsxToString(col.title),
        dataIndex: col.dataIndex,
        key: col.key,
        width: 100,
        style: {
          font: {
            bold: true,
            color: { rgb: 'FF0000' },
          },
        },
      }));

      const worker = new ExcelWorker();

      worker.postMessage({
        action: 'exportExcel',
        payload: {
          columns: workerColumns,
          data,
        },
      });

      worker.onmessage = (event) => {
        const { buffer } = event.data;
        if (buffer) {
          downloadExcel(buffer);
        }
        worker.terminate();
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error);
        worker.terminate();
      };
    } catch (error) {
      console.error('Failed to export Excel:', error);
    }
  };

  const downloadExcel = (buffer: Buffer) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#777' }}>
      <Table columns={columns} dataSource={data} />
      <Button onClick={() => exportExcel()}>Export</Button>
    </div>
  );
};

export default ExcelTable;
