import * as path from 'path';
import { writeFile, unlink } from 'fs/promises';
import { generateApi } from 'swagger-typescript-api';
import Logger from './Logger';

const logger = new Logger();

class TypeGenerator {
  uri!: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async queryApiDocs(uri: string): Promise<Record<string, any>> {
    try {
      const response = await fetch(uri, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'error',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      logger.error(err as Error);
      return {};
    }
  }

  async saveAsTemp(data: string): Promise<string | undefined> {
    const tempPath = path.resolve(process.cwd(), `.temp-${new Date().getTime()}.json`);
    try {
      await writeFile(tempPath, data);
      return tempPath;
    } catch (err) {
      logger.error(err as Error);
    }
  }

  async generate(): Promise<void> {
    const docs = await this.queryApiDocs(this.uri);
    const stringifiedDocs = JSON.stringify(docs);
    const tempFile = await this.saveAsTemp(stringifiedDocs);
    await generateApi({
      input: tempFile,
      output: path.join(process.cwd(), 'swagger'),
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
    });
    await unlink(tempFile as string);
  }
}

export default TypeGenerator;
