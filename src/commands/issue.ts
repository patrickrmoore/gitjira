import { Command, flags } from "@oclif/command";
import JiraApi from "../JiraApi";

export default class Issue extends Command {
  static description = "Get a single issue";

  static examples = [
    `$ gj issue HB-4820
HB-4820 (Status: In Development)
When a user deletes an item, they should get a confirmation box 
`
  ];

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
        `${response.data.key} (Status: ${response.data.fields.status.name})\n${
          response.data.fields.summary
        }`
      );
    } catch (error) {
      this.error(`${error.name} - ${error.message}`);
    }
  }
}
