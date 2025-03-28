export const exportExcelWithWorker = (columns, data, fileName) => {
  const worker = new Worker(new URL('./excel.worker.js', import.meta.url));
  worker.postMessage({ columns, data, fileName });

  worker.onmessage = (event) => {
    const { buffer, fileName } = event.data;
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    worker.terminate();
  };
};
