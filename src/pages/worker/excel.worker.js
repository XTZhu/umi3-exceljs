import { jsxToString } from './workerUtils';

// 使用 web worker 处理 Excel 下载逻辑
onmessage = async (event) => {
  const {
    data: { payload, action },
  } = event;

  if (action !== 'exportExcel') {
    return;
  }
  // 假设 data 包含生成 Excel 所需的信息
  try {
    // 引入 exceljs 库
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();

    payload.map((item) => {
      const sheet = workbook.addWorksheet(item.title);
      item.data.map((dataItem) => {
        sheet.addRow(dataItem);
      });
      sheet.columns = item.columns.map((col) => ({
        header: jsxToString(col.header),
        key: col.dataIndex,
      }));
      // 根据 data 填充 Excel 数据
      item.data.forEach((row) => {
        sheet.addRow(row);
      });
    });

    // 生成 Excel 文件并发送回主线程
    const buffer = await workbook.xlsx.writeBuffer();

    self.postMessage(buffer);
  } catch (error) {
    console.log(
      '%c [ error ]-50',
      'font-size:13px; background:#adcc6c; color:#f1ffb0;',
      error,
    );
    self.postMessage({ error });
  }
};
