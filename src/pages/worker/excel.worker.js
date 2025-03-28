import EXSL from 'exceljs';

self.onmessage = async (event) => {
  const { columns, data, fileName } = event.data;

  const workbook = new EXSL.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  worksheet.columns = columns.map((column) => ({
    header: column.title,
    key: column.dataIndex,
    width: 20,
  }));
  data.forEach((record) => {
    worksheet.addRow(record);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  self.postMessage({ buffer, fileName });
};
