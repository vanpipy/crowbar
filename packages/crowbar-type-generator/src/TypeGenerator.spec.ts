import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { writeFile } from 'fs/promises';
import { swaggerGenerate } from './helper';
import TypeGenerator from './TypeGenerator';

jest.mock('fs/promises');
jest.mock('./helper', () => ({
  swaggerGenerate: jest.fn(),
  request: jest.fn().mockImplementation(() => ({
    json: () => ({ a: 1 }),
  })),
}));

const cwd = process.cwd();

describe('TypeGenerator', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('1970-01-01'));
  });

  it('should catch an empty uri exception when the uri is invalid', () => {
    // eslint-disable-next-line
    // @ts-ignore
    const create = () => new TypeGenerator();
    const createAgain = () => new TypeGenerator({ uri: '' });
    expect(() => create()).toThrow('The uri is required for TypeGenerator');
    expect(() => createAgain()).toThrow('The uri is required for TypeGenerator');
  });

  it('should be invoked the default config', async () => {
    const typeGenerator = new TypeGenerator({ uri: 'https://domain' });
    await typeGenerator.generate();
    expect(swaggerGenerate).toHaveBeenCalledWith({
      input: `${cwd}/.temp-0.json`,
      output: `${cwd}/swagger`,
      moduleNameFirstTag: true,
      moduleNameIndex: 1,
      unwrapResponseData: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
      sortTypes: true,
      sortRoutes: true,
      patch: true,
      httpClientType: 'axios',
      generateClient: true,
      generateResponses: true,
      generateRouteTypes: true,
      generateUnionEnums: true,
      // eslint-disable-next-line
      // @ts-ignore
      modular: true,
    });
  });

  it('should set an overwrited output', async () => {
    const typeGenerator = new TypeGenerator({ uri: 'https://domain', output: './swagger' });
    await typeGenerator.generate();
    expect(swaggerGenerate).toHaveBeenCalledWith({
      input: `${cwd}/.temp-0.json`,
      output: './swagger',
      moduleNameFirstTag: true,
      moduleNameIndex: 1,
      unwrapResponseData: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
      sortTypes: true,
      sortRoutes: true,
      patch: true,
      httpClientType: 'axios',
      generateClient: true,
      generateResponses: true,
      generateRouteTypes: true,
      generateUnionEnums: true,
      // eslint-disable-next-line
      // @ts-ignore
      modular: true,
    });
  });

  it('should transform the data via a transformer passed', async () => {
    const transform = jest.fn<any>().mockImplementation(() => ({ a: 2 }));
    const typeGenerator = new TypeGenerator({ uri: 'https://domain', transform });
    await typeGenerator.generate();
    expect(transform).toHaveBeenCalledWith({ a: 1 });
    expect(writeFile).toHaveBeenCalledWith(`${cwd}/.temp-0.json`, JSON.stringify({ a: 2 }));
  });
});
