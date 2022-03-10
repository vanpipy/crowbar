import { Configuration } from 'webpack';

interface Options extends Configuration {
  crowbar?: {
    cwd?: string;
    filename?: string;
  };
}

class Config {
  private options: Options;

  constructor(opt: Options = {}) {
    const { crowbar, ...rest } = opt;
    this.options = { ...rest, crowbar };
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
