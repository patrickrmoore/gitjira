import { Command, flags } from "@oclif/command";
import JiraApi from "../JiraApi";

export default class Query extends Command {
  static description = "Query Jira issues";

  static examples = [
    `$ gj query -v "2018.1"`,
    `$ gj query -m 10 -s 5`,
    `$ gj query -p HB`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    maxResults: flags.integer({
      char: "m",
      description: "limit to [n] results"
    }),
    startAt: flags.integer({ char: "s", description: "index to start at" }),
    fixVersion: flags.string({
      char: "v",
      description: "fix version (enclosed in quotes)"
    }),
    fields: flags.string({
      char: "f",
      description: "list of fields to return (comma delimited)"
    }),
    project: flags.string({ char: "p", description: "project" })
  };

  static args = [{ name: "key" }];

  async run() {
    const { args, flags } = this.parse(Query);

    try {
      const response = await JiraApi.search({
        startAt: flags.startAt,
        maxResults: flags.maxResults,
        project: flags.project || "HB",
        fixVersion: flags.fixVersion,
        fields: flags.fields
      });

      const { issues } = response.data;

      issues.forEach(issue => {
        this.log(JSON.stringify(issue));
      });
    } catch (error) {
      this.error(`${error.name} - ${error.message}`);
    }
  }
}
