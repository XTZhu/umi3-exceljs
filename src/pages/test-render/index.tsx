import React from 'react';
import { Table, Popover } from 'antd';
import ExcelJS from 'exceljs';

// 示例数据
const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 32,
    address: '123 Main St',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 28,
    address: '456 Elm St',
  },
];

// 示例 columns 配置
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
    render: (text) => <span>{text} years old</span>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text) => {
      // 使用 Popover 显示更多信息
      return (
        <Popover
          content={<span>More info about {text}</span>}
          title="Address Info"
        >
          <span>{text}</span>
        </Popover>
      );
    },
  },
];

// 辅助函数：递归提取 React 元素中的文本
const extractTextFromReactElement = (element) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return element.toString();
  }
  if (React.isValidElement(element)) {
    return React.Children.toArray(element.props.children)
      .map(extractTextFromReactElement)
      .join('');
  }
  return '';
};

// 优化后的转换函数
const convertColumnsToExcelFormat = (dataSource, columns) => {
  const headers = columns.map((col) => col.title);
  const rows = dataSource.map((record) => {
    return columns.map((col) => {
      if (col.render) {
        const rendered = col.render(record[col.dataIndex], record);
        return extractTextFromReactElement(rendered);
      }
      return record[col.dataIndex];
    });
  });
  return { headers, rows };
};

// 生成 Excel 文件
const generateExcel = () => {
  const { headers, rows } = convertColumnsToExcelFormat(dataSource, columns);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // 添加表头
  worksheet.addRow(headers);

  // 添加数据行
  rows.forEach((row) => {
    worksheet.addRow(row);
  });

  // 保存 Excel 文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

const App = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <button onClick={generateExcel}>Export to Excel</button>
    </div>
  );
};

export default App;
