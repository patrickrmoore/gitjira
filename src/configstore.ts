import * as Configstore from "configstore";

const config = new Configstore("gjcli", {
  username: null,
  password: null,
  baseURL: null
});

export default config;
