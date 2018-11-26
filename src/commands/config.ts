import { Command, flags } from "@oclif/command";
import { Config as BaseConfig } from "../config";

enum ConfigFlows {
  All,
  Get,
  Set,
  Clear,
  Default
}

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
    all: flags.boolean({ char: "a" }),
    clear: flags.boolean({ char: "c" })
  };

  static args = [{ name: "key" }, { name: "value" }];

  determineFlow() {
    const { args, flags } = this.parse(Config);

    if (flags.all) {
      return ConfigFlows.All;
    }

    if (flags.clear) {
      return ConfigFlows.Clear;
    }

    if (args.value) {
      return ConfigFlows.Set;
    }

    if (args.key) {
      return ConfigFlows.Get;
    }

    return ConfigFlows.Default;
  }

  async run() {
    const { args } = this.parse(Config);
    const { key, value } = args;

    const flow = this.determineFlow();

    switch (flow) {
      case ConfigFlows.All: {
        console.log(BaseConfig.all);
        break;
      }
      case ConfigFlows.Clear: {
        BaseConfig.set("savedQueries", undefined);
        break;
      }
      case ConfigFlows.Get: {
        const currentValue = BaseConfig.get(key);
        this.log(`${key}=${currentValue}`);
        break;
      }
      case ConfigFlows.Set: {
        const currentValue = BaseConfig.get(key);
        BaseConfig.set(key, value);
        this.log(`${key}=${value} (was ${currentValue})`);
      }
      default: {
        if (!key) {
          this.error("Key must be passed");
        }
      }
    }
  }
}
