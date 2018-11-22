import { Command, flags } from "@oclif/command";
import JiraApi from "../JiraApi";

export default class Issue extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [{ name: "key" }];

  async run() {
    const { args, flags } = this.parse(Issue);

    if (!args.key) {
      this.error("Issue key not specified");
    }

    try {
      const response = await JiraApi.getIssue(args.key);
      this.log(
        JSON.stringify(`${response.data.key} - ${response.data.fields.summary}`)
      );
    } catch (error) {
      this.error(`${error.name} - ${error.message}`);
    }
  }
}
