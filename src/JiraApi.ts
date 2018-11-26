import Axios, { AxiosInstance } from "axios";
import { JiraSearchResponse, JiraSearchParams, JiraIssue } from "./models";
import { Config } from "./config";

export default class JiraApi {
  public axios: AxiosInstance;

  constructor() {
    const username = Config.username;
    const password = Config.password;
    const baseURL = Config.baseURL;

    if (!username || !password || !baseURL) {
      throw new Error(
        `Config must be set before continuing.\nCurrent:\nusername=${username}\npassword=${password}\nbaseURL=${baseURL}`
      );
    }
    this.axios = Axios.create({
      auth: { username, password },
      baseURL: `${baseURL}/rest/api/3/`
    });
  }

  async getIssue(key: string) {
    return await this.axios.get<JiraIssue>(`issue/${key}`);
  }

  async search(params: JiraSearchParams = {}) {
    const formattedParams = JiraApi.formatJiraSearchParams(params);
    return await this.axios.get<JiraSearchResponse>("search", {
      params: formattedParams
    });
  }

  static formatJiraSearchParams(params: JiraSearchParams) {
    let jql = "jql=";
    let jqlCount = 0;

    if (params.fixVersion) {
      jql = JiraApi.appendJqlParam(
        jql,
        `fixVersion = "${params.fixVersion}"`,
        jqlCount
      );
      jqlCount++;
    }

    if (params.project) {
      jql = JiraApi.appendJqlParam(
        jql,
        `project = ${params.project}`,
        jqlCount
      );
      jqlCount++;
    }

    if (params.jql) {
      jql = JiraApi.appendJqlParam(jql, params.jql, jqlCount);
      jqlCount++;
    }

    return {
      startAt: params.startAt || 0,
      maxResults: params.maxResults || 15,
      jql: jqlCount ? jql : undefined,
      fields: params.fields || undefined
    };
  }

  static appendJqlParam(jql: string, jqlParam: string, jqlCount: number) {
    if (jqlCount) {
      return `${jql} AND ${jqlParam}`;
    }
    return jqlParam;
  }
}
