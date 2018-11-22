import Axios from "axios";
import { JiraSearchResponse, JiraSearchParams, JiraIssue } from "./models";
import config from "./configstore";

const username = config.get("username");
const password = config.get("password");
const baseURL = config.get("baseURL");

export default class JiraApi {
  static axios = Axios.create({
    auth: {
      username,
      password
    },
    baseURL: `${baseURL}/rest/api/3/`
  });

  static async validateConfig() {
    if (!username || !password || !baseURL) {
      throw new Error(
        `Config must be set before continuing.\nCurrent:\nusername=${username}\npassword=${password}\nbaseURL=${baseURL}`
      );
    }
  }

  static async getIssue(key: string) {
    JiraApi.validateConfig();
    return await JiraApi.axios.get<JiraIssue>(`issue/${key}`);
  }

  static async search(params: JiraSearchParams = {}) {
    JiraApi.validateConfig();
    const formattedParams = JiraApi.formatJiraSearchParams(params);
    return await JiraApi.axios.get<JiraSearchResponse>("search", {
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
