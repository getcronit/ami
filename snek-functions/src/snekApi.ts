import fetch, { File } from "node-fetch";
import FormData from "form-data";
export interface SnekApiOptions {}

export class SnekApi {
  url: string;
  options: SnekApiOptions;

  constructor(url: string, options?: SnekApiOptions) {
    this.url = url.replace(/\/$/, "");
    this.options = options || {};
  }

  async createSheet(args: {
    projectId: number;
    sheetsToken: string;
    sheetName: string;
    file: File;
  }): Promise<{
    name: string;
  }> {
    const { projectId, sheetsToken, sheetName, file } = args;

    const url = `${this.url}/projects/${projectId}/sheets?sheets_token=${sheetsToken}&sheet_name=${sheetName}`;

    const formData = new FormData();

    const text = await file.text();

    formData.append("in_file", text, {
      filename: file.name,
    });

    console.log("formData", formData);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return (await res.json()) as any;
  }

  async getSheet(args: {
    projectId: number;
    sheetName: string;
    sheetsToken: string;
  }): Promise<File> {
    const { projectId, sheetName, sheetsToken } = args;
    const url = `${this.url}/projects/${projectId}/sheets/${sheetName}?sheets_token=${sheetsToken}`;

    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    const blob = await res.blob();

    const filename = res.headers.get("content-disposition");
    if (filename) {
      const filenameRegex = /filename="(.*)"/;
      const filenameMatch = filenameRegex.exec(filename);
      if (filenameMatch) {
        return new File([blob], filenameMatch[1] as string);
      }
    }
    return new File([blob], `${sheetName}.sheet`);
  }

  async getSheets(args: { projectId: number; sheetsToken: string }): Promise<
    Array<{
      name: string;
    }>
  > {
    const { projectId, sheetsToken } = args;
    const url = `${this.url}/projects/${projectId}/sheets?sheets_token=${sheetsToken}`;

    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return (await res.json()) as any;
  }

  async updateSheet(args: {
    projectId: number;
    sheetsToken: string;
    sheetName: string;
    file: File;
  }): Promise<void> {
    const { projectId, sheetsToken, sheetName, file } = args;
    const url = `${this.url}/projects/${projectId}/sheets/${sheetName}?sheets_token=${sheetsToken}`;

    const text = await file.text();

    const formData = new FormData();
    formData.append("in_file", text, {
      filename: file.name,
    });

    const res = await fetch(url, {
      method: "PATCH",
      body: formData,
    });

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return;
  }

  async deleteSheet(args: {
    projectId: number;
    sheetsToken: string;
    sheetName: string;
  }): Promise<void> {
    const { projectId, sheetsToken, sheetName } = args;
    const url = `${this.url}/projects/${projectId}/sheets/${sheetName}?sheets_token=${sheetsToken}`;

    const res = await fetch(url, {
      method: "DELETE",
    });

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return;
  }
}
