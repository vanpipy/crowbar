import { type ChildProcess, spawn } from 'node:child_process';
import Logger from './Logger';

const logger = new Logger();

class Script {
  instance!: ChildProcess;

  cwd!: string;

  command!: string;

  args!: string[];

  constructor(config: { cwd?: string; command?: string; args: string[] }) {
    const { cwd = process.cwd(), command = 'node', args = [] } = config;
    this.cwd = cwd;
    this.command = command;
    this.args = args;
  }

  async spawn(): Promise<void> {
    const { cwd, command, args } = this;
    logger.log(`Spawning command - ${[command, ...args].join(' ')}`);
    this.instance = spawn(command, args, { cwd, stdio: 'inherit' });
    await new Promise<void>((resolve, reject) => {
      this.instance.on('close', () => {
        resolve();
      });
      this.instance.on('error', (err) => {
        logger.error(err.stack as string);
        reject(err);
        process.exit(2);
      });
      process.on('SIGHUP', () => {
        logger.log('Processor has been killed by user');
        this.instance.kill();
      });
      process.on('SIGINT', () => {
        logger.log('Processor has been killed by user');
        this.instance.kill();
      });
    });
  }
}

export default Script;
