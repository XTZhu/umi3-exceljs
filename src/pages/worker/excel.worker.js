// 使用 web worker 处理 Excel 下载逻辑
onmessage = async (event) => {
  const {
    data: { payload, action },
  } = event;

  const { columns = [], data } = payload;
  if (action !== 'exportExcel') {
    return;
  }
  // 假设 data 包含生成 Excel 所需的信息
  try {
    // 引入 exceljs 库
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');

    sheet.columns = columns.map((col) => ({
      header: col.title,
      key: col.dataIndex,
    }));

    // 根据 data 填充 Excel 数据
    data.forEach((row) => {
      sheet.addRow(row);
    });

    // 生成 Excel 文件并发送回主线程
    const buffer = await workbook.xlsx.writeBuffer();

    self.postMessage(buffer);
  } catch (error) {
    self.postMessage({ error });
  }
};
