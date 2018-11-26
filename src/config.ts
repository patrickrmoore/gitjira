import * as Configstore from "configstore";

const config = new Configstore("gjcli", {
  username: null,
  password: null,
  baseURL: null,
  savedQueries: []
});

export class Config {
  static get username(): string | undefined {
    return config.get("username");
  }

  static get password(): string | undefined {
    return config.get("password");
  }

  static get baseURL(): string | undefined {
    return config.get("baseURL");
  }

  static get all(): any {
    const value = config.all();
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  }

  static get savedQueries(): any[] {
    const queries = this.get<any[]>("savedQueries");
    if (queries) {
      return queries;
    }
    return [];
  }

  public static get<T>(key: string): T | undefined {
    const value = config.get(key);
    try {
      if (typeof value === "string") {
        return JSON.parse(value);
      }
    } catch {}
    return value;
  }

  public static set<T>(key: string, value: T): T {
    config.set(key, value);
    return value;
  }
}

export default new Config();
