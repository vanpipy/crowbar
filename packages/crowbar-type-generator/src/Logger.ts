class Logger {
  log(msg: string): void {
    console.log(`> ${msg}`);
  }

  error(msg: string | Error): void {
    if (msg instanceof Error) {
      console.error('>', Error);
    } else {
      console.error(`> ${msg}`);
    }
  }
}

export default Logger;
