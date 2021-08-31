import Module from "module";
import {dirname} from "path";

interface ModulePrototype extends Module {
  _complie: (code: string, filename: string) => void
}

const ModuleProto: ModulePrototype = Module.prototype;

export const createModule = (filename: string, source: string) => {
  const cacheModule = new Module(filename);
  cacheModule.path = dirname(filename);
  ModuleProto._complie.apply(cacheModule, [source, filename]);
};

export const loadModule = (filename: string, context?: string) => {
  if (typeof context === 'string') {
    return;
  }
};
