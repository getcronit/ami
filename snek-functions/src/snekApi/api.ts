import fetch, {
  File,
  Headers,
  HeadersInit,
  RequestInit,
  RequestInfo,
  Response,
} from "node-fetch";
import FormData from "form-data";
import { IAuthRefreshResponse } from "./types";

export interface SnekApiOptions {}

class KeyManager {
  static LOCAL_STORAGE_KEY = "snek-auth";
  static LOCAL_STORAGE_ACCESS = this.LOCAL_STORAGE_KEY + "/access_token";
  static LOCAL_STORAGE_REFRESH = this.LOCAL_STORAGE_KEY + "/refresh_token";

  static getAccessToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_ACCESS);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_ACCESS, token);
  }

  static getRefreshToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_REFRESH);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_REFRESH, token);
  }

  static prepareAuthHeaders(headersInit?: HeadersInit, refresh = false) {
    const headers = new Headers(headersInit);

    if (refresh) {
      headers.append("Authorization", "Bearer " + this.getRefreshToken());
    } else {
      headers.append("Authorization", "Bearer " + this.getAccessToken());
    }

    return headers;
  }

  static clearTokens() {
    localStorage.removeItem(this.LOCAL_STORAGE_ACCESS);
    localStorage.removeItem(this.LOCAL_STORAGE_REFRESH);
  }
}

export class SnekApi {
  url: string;
  options: SnekApiOptions;

  constructor(url: string, options?: SnekApiOptions) {
    this.url = url.replace(/\/$/, "");
    this.options = options || {};
  }

  async baseFetch(
    input: RequestInfo,
    init?: RequestInit,
    options: {
      enablePersistendAuth?: boolean;
    } = { enablePersistendAuth: true }
  ): Promise<Response> {
    const response = await fetch(this.url + input, {
      ...init,
      headers: KeyManager.prepareAuthHeaders(init?.headers),
    });

    if (!options?.enablePersistendAuth) {
      return response;
    }

    if (response.status === 422) {
      // refresh
      const refreshResponse = await fetch(this.url + "/auth/refresh", {
        method: "POST",
        headers: KeyManager.prepareAuthHeaders({}, true),
      });

      if (refreshResponse.status === 401) {
        throw new Error("refresh failed");
      }

      if (refreshResponse.status === 200) {
        const refreshResponseJson =
          (await refreshResponse.json()) as IAuthRefreshResponse;

        KeyManager.setAccessToken(refreshResponseJson.access_token);

        return await this.baseFetch(input, init, options);
      }
    }

    if (response.status !== 200) {
      const error = (await response.json()) as {
        detail: string;
      };
      throw new Error(error.detail);
    }

    return response;
  }

  async createSheet(args: {
    projectId: number;
    sheetsToken?: string;
    sheetName: string;
    file: File;
  }): Promise<{
    name: string;
  }> {
    const { projectId, sheetsToken, sheetName, file } = args;

    let url = `/projects/${projectId}/sheets?sheet_name=${sheetName}`;

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`;
    }

    const formData = new FormData();

    const text = await file.text();

    formData.append("in_file", text, {
      filename: file.name,
    });

    console.log("formData", formData);

    const res = await this.baseFetch(url, {
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
    sheetsToken?: string;
  }): Promise<File> {
    const { projectId, sheetName, sheetsToken } = args;
    let url = `/projects/${projectId}/sheets/${sheetName}`;

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`;
    }

    const res = await this.baseFetch(url);

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

  async getSheets(args: { projectId: number; sheetsToken?: string }): Promise<
    Array<{
      name: string;
    }>
  > {
    const { projectId, sheetsToken } = args;
    let url = `/projects/${projectId}/sheets`;

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`;
    }

    const res = await this.baseFetch(url);

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return (await res.json()) as any;
  }

  async updateSheet(args: {
    projectId: number;
    sheetsToken?: string;
    sheetName: string;
    file: File;
  }): Promise<void> {
    const { projectId, sheetsToken, sheetName, file } = args;
    let url = `/projects/${projectId}/sheets/${sheetName}`;

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`;
    }

    const text = await file.text();

    const formData = new FormData();
    formData.append("in_file", text, {
      filename: file.name,
    });

    const res = await this.baseFetch(url, {
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
    sheetsToken?: string;
    sheetName: string;
  }): Promise<void> {
    const { projectId, sheetName, sheetsToken } = args;
    let url = `/projects/${projectId}/sheets/${sheetName}`;

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`;
    }

    const res = await this.baseFetch(url, {
      method: "DELETE",
    });

    if (res.status !== 200) {
      throw new Error(await res.text());
    }

    return;
  }
}
