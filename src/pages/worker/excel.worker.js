// 使用 web worker 处理 Excel 下载逻辑
self.onmessage = async (event) => {
  console.log(
    '%c [ event ]-3',
    'font-size:13px; background:#be8df9; color:#ffd1ff;',
    event,
  );
  const { data } = event;
  // 假设 data 包含生成 Excel 所需的信息
  try {
    // 引入 exceljs 库
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');

    // 根据 data 填充 Excel 数据
    data.forEach((row) => {
      sheet.addRow(row);
    });

    // 生成 Excel 文件并发送回主线程
    const buffer = await workbook.xlsx.writeBuffer();
    self.postMessage(buffer);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
