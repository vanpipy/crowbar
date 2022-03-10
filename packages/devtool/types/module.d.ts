declare module 'module' {
  namespace Module {
    export function _nodeModulePaths(paths: string | string[]): string[];
  }

  class Module extends NodeModule {
    _complie: (code: string, filename: string) => void;
    constructor(id: string, parent?: Module);
  }

  export = Module
}

