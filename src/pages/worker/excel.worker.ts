import { createExcelJsSheet } from './workerUtils';
import ExcelJS from 'exceljs';

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
    const workbook = new ExcelJS.Workbook();

    await Promise.all(
      payload.map(async (item) => {
        await createExcelJsSheet(
          {
            sheetName: item.sheetName,
            style: {},
            headerColumns: item.columns,
            tableData: item.data,
          },
          workbook,
        );
      }),
    );

    // 生成 Excel 文件并发送回主线程
    const buffer = await workbook.xlsx.writeBuffer();

    self.postMessage(buffer);
  } catch (error) {
    console.error('Worker error:', error);
    self.postMessage({ error });
  }
};
