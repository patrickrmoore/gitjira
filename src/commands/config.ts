import { Command, flags } from "@oclif/command";
import config from "../configstore";

export default class Config extends Command {
  static description = "Get/set config values";

  static examples = [
    `$ gj config username
username=patrick.moore@hcss.com`,
    `$ gj config username elise.ingram@hcss.com
username=elise.ingram@hcss.com
(was patrick.moore@hcss.com)`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    all: flags.boolean({ char: "a" })
  };

  static args = [{ name: "key" }, { name: "value" }];

  async run() {
    const { args, flags } = this.parse(Config);
    const { key, value } = args;

    if (flags.all) {
      this.log(JSON.stringify(config.all));
    } else {
      if (!key) {
        this.error("Key must be passed");
      }

      const currentValue = config.get(key);

      if (!value) {
        this.log(`${key}=${currentValue}`);
      } else {
        config.set(key, value);
        this.log(`${key}=${value} (was ${currentValue})`);
      }
    }
  }
}
