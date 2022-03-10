import Module from 'module';
import { dirname, resolve } from 'path';
import { readFile } from 'fs-extra';
import { PACKAGE_NAME } from './constant';

export const createModule = (filename: string, source: string) => {
  const cacheModule = new Module(filename);
  cacheModule.paths = Module._nodeModulePaths(dirname(filename));
  cacheModule._complie(source, filename);
  return cacheModule.exports;
};

export const loadModule = async (filename: string, context?: string): Promise<Module> => {
  if (typeof context === 'string') {
    const requireByContext = Module.createRequire(resolve(context, PACKAGE_NAME));
    const targetModule = requireByContext(filename);
    return targetModule;
  }

  const source = await readFile(filename);
  const targetModule = createModule(filename, source.toString());
  return targetModule;
};
