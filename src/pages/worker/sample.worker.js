const PREFIX_WORK1 = '[WORK1]';

onmessage = (event) => {
  try {
    const msg = event.data;
    console.log(event);

    const greeting = `Hello, ${msg}!`;

    // postMessage(greeting);
    logInfo(`Sent response: ${greeting}`);
  } catch (error) {
    // logError(`Error processing message: ${error.message}`);
    // postMessage(`Error: ${error.message}`);
  }
};

function logInfo(message) {
  console.log(`${PREFIX_WORK1} INFO: ${message}`);
}

function logError(message) {
  console.error(`${PREFIX_WORK1} ERROR: ${message}`);
}
