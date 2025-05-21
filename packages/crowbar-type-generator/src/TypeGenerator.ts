import * as path from 'path';
import { writeFile, unlink } from 'fs/promises';
import Logger from './Logger';
import { request, swaggerGenerate } from './helper';

type Transform = (json: Record<string, any>) => Record<string, any>;

type GeneratorParams = {
  uri: string;
  transform?: Transform;
  output?: string;
};

const logger = new Logger();

class TypeGenerator {
  private params!: GeneratorParams;

  constructor(params: GeneratorParams) {
    this.params = { ...this.params, ...params };
    if (!this.params.uri) {
      throw new Error('The uri is required for TypeGenerator');
    }
  }

  private async queryApiDocs(uri: string): Promise<Record<string, any>> {
    try {
      const response = await request(uri, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'error',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await response.json();
      if (typeof this.params.transform === 'function') {
        return this.params.transform(data);
      }
      return data;
    } catch (err) {
      logger.error(`Failed to request ${uri}`);
      logger.error(err as Error);
      return {};
    }
  }

  private async saveAsTemp(data: string): Promise<string | undefined> {
    const tempPath = path.resolve(process.cwd(), `.temp-${new Date().getTime()}.json`);
    try {
      await writeFile(tempPath, data);
      return tempPath;
    } catch (err) {
      logger.error('Failed to write temp file.\n');
      logger.error(err as Error);
    }
  }

  public async generate(): Promise<void> {
    const docs = await this.queryApiDocs(this.params.uri);
    const stringifiedDocs = JSON.stringify(docs);
    const tempFile = await this.saveAsTemp(stringifiedDocs);
    const output = this.params.output || path.join(process.cwd(), 'swagger');
    await swaggerGenerate({
      input: tempFile,
      output,
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
      // existed but cannot find here, bug for swagger-typescript-api
      // eslint-disable-next-line
      // @ts-ignore
      modular: true,
    });
    await unlink(tempFile as string);
  }
}

export default TypeGenerator;
