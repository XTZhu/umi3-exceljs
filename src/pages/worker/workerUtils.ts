import ExcelJS from 'exceljs';

export const exportExcelWithWorker = async (
  columns: Array<{ title: string; dataIndex: string; key: string }>,
  data: Array<Record<string, any>>,
  fileName: string,
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // 添加列
  worksheet.columns = columns.map((col) => ({
    header: col.title,
    key: col.dataIndex,
  }));

  // 添加数据
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  // 导出文件
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
