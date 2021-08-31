import { Configuration } from 'webpack';

interface Options extends Configuration {
      filename?: string;
    cwd?: string
}

class Config {
  private options: Options;

  constructor(opt: Options = {}) {
    const { cwd = process.cwd(), ...rest } = opt;
    this.options = { ...rest, cwd };
  }

  getOptions() {
    return this.options;
  }

  readRepoConfig() {

  }

  mergeReporConfig() {

  }
}

export default Config;
