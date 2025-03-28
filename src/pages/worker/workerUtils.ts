// import excelWorker from '@/pages/worker/excel.worker';

// export const createExcelWorker = (
//   columns: any[],
//   data: any[],
// ): Promise<Blob> => {
//   return new Promise((resolve, reject) => {
//     const worker = new excelWorker();

//     // 向 worker 发送数据
//     worker.postMessage({ columns, data });

//     // 监听 worker 的消息
//     worker.onmessage = (event) => {
//       const { data } = event;
//       if (data.error) {
//         reject(new Error(data.error));
//       } else {
//         resolve(
//           new Blob([data], {
//             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//           }),
//         );
//       }
//       worker.terminate();
//     };

//     // 监听 worker 的错误
//     worker.onerror = (error) => {
//       reject(error);
//       worker.terminate();
//     };
//   });
// };
