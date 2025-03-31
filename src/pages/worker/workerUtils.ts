// Note: Worker Utils
import { ColumnType } from 'antd/lib/table';
import ExcelJS from 'exceljs';
import { renderToStaticMarkup } from 'react-dom/server';

export interface HeaderType {
  header?: string;
  dataIndex: string;
  title?: string;
  width?: number;
}

export interface DictMapType {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ExcelParamsType {
  headerColumns: HeaderType[];
  tableData: any;
  sheetName: string;
  style?: Partial<ExcelJS.Style>;
  // dicts?: DictMapListType;
}

// 获取所有分页的数据
export const fetchAllPages = async (
  requestFn: Function,
  params: Record<string, any>,
) => {
  try {
    // 请求第一页数据
    const firstPageResponse = await requestFn({ ...params, page: 1 });

    if (firstPageResponse.last_page <= 1) {
      postMessage(firstPageResponse);
      return;
    }

    let allData = [...firstPageResponse.data];

    // 并行请求剩余分页数据
    const pagePromises = [];
    // eslint-disable-next-line no-plusplus
    for (let page = 2; page <= firstPageResponse.last_page; page++) {
      pagePromises.push(requestFn({ ...params, page }));
    }

    const pageResults = await Promise.all(pagePromises);

    // 合并所有分页数据
    pageResults.forEach((result) => {
      allData = [...allData, ...result.data];
    });

    const result = {
      ...firstPageResponse,
      data: allData,
      current_page: 1,
    };

    postMessage(result);
  } catch (error) {
    postMessage({ error: error || '未知错误' });
  }
};

/**
 * 将 JSX 内容转换为纯文本
 * @param content JSX 内容或 React 元素
 */
export const jsxToString = (content: React.ReactNode): string => {
  if (content === null || content === undefined) {
    return '';
  }

  if (
    typeof content === 'string' ||
    typeof content === 'number' ||
    typeof content === 'boolean'
  ) {
    return String(content);
  }

  try {
    // 尝试将 JSX 转为 HTML 字符串
    const htmlString = renderToStaticMarkup(content as React.ReactElement);
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text;
  } catch (error) {
    console.error('转换 JSX 到字符串失败:', error);
    return String(content) || '';
  }
};

/**
 * 将 antd 的列配置转换为 ExcelJS 可用的格式
 * @param columns antd 表格的列配置
 * @param dataSource 表格数据
 */
export const convertAntdColumnsToExcel = <T extends Record<string, any>>(
  columns: ColumnType<T>[],
  dataSource: T[],
) => {
  // 转换列定义
  const excelColumns = columns
    .filter((col) => col.dataIndex) // 排除隐藏列
    .map((col) => ({
      header: col.title as string,
      key: col.dataIndex as string,
      width: (col.width as number) * 2 || 40,
    }));

  // 转换数据，处理 render 函数的结果
  const excelData = dataSource.map((record) => {
    const rowData: Record<string, any> = {};

    columns.forEach((col) => {
      if (!col.dataIndex) return;

      const key = col.dataIndex as string;

      if (col.render) {
        // 如果有 render 函数，调用它获取渲染后的内容
        const renderedValue = col.render(record[key], record, 0);
        rowData[key] = jsxToString(renderedValue);
      } else {
        // 否则直接使用原始值
        rowData[key] = record[key];
      }
    });

    return rowData;
  });

  return {
    columns: excelColumns,
    data: excelData,
  };
};

// 创建 ExcelJS 工作表
export const createExcelJsSheet = (
  options: ExcelParamsType,
  workbook: ExcelJS.Workbook,
) => {
  const { sheetName, style, headerColumns, tableData } = options;

  // 添加工作表
  const worksheet = workbook.addWorksheet(sheetName);
  if (headerColumns.length > 0) {
    const headerColumn = convertAntdColumnsToExcel(headerColumns, tableData);

    // 设置列头
    const columnsData = headerColumn.columns;
    worksheet.columns = columnsData;
    // 设置表头样式
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.style = (style || {}) as Partial<ExcelJS.Style>;
    });
  }
  // 设置行数据
  if (tableData.length > 0) {
    // 将传入的数据格式化为exceljs可使用的数据格式
    const data: any[] = [];

    // 添加行
    if (data) worksheet.addRows(data);
    // 获取每列数据，依次对齐
    worksheet.columns.forEach((column) => {
      // eslint-disable-next-line no-param-reassign
      column.alignment = (style?.alignment as Partial<ExcelJS.Alignment>) || {};
    });
    // 设置每行的边框
    const dataLength = data.length as number;
    const tabeRows = worksheet.getRows(2, dataLength + 1) || [];
    tabeRows.forEach((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.border = (style?.border as Partial<ExcelJS.Borders>) || {};
      });
    });
  }
  return workbook;
};

export default {};
