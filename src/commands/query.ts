import { Command, flags } from "@oclif/command";
import JiraApi from "../JiraApi";
import { Config } from "../config";
import inquirer = require("inquirer");
import prettyjson = require("prettyjson");
import { JiraIssue } from "../models";
import nodegit = require("nodegit");
import * as notifier from "node-notifier";

enum QueryFlows {
  default,
  list
}

const jiraApi = new JiraApi();

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
    project: flags.string({ char: "p", description: "project" }),
    save: flags.string({ description: "Save query" }),
    list: flags.boolean({ char: "l", description: "List saved queries" })
  };

  static args = [{ name: "key" }];

  async run() {
    const { args, flags } = this.parse(Query);

    const flow = flags.list ? QueryFlows.list : QueryFlows.default;

    switch (flow) {
      case QueryFlows.list: {
        const queries = Config.savedQueries;
        if (queries.length) {
          let responses = await inquirer.prompt<{ query: any }>([
            {
              name: "query",
              message: "select a query",
              type: "list",
              choices: queries.map(query => ({
                name: query.name,
                value: query
              }))
            }
          ]);
          const response = await jiraApi.search(responses.query.query);
          this.printIssues(response.data.issues);
        }
        break;
      }
      default: {
        try {
          const response = await jiraApi.search({
            startAt: flags.startAt,
            maxResults: flags.maxResults,
            project: flags.project,
            fixVersion: flags.fixVersion,
            fields: flags.fields
          });

          if (flags.save) {
            const queries = Config.savedQueries;
            const { save, list, ...filters } = flags;
            queries.push({ name: flags.save, query: filters });
            Config.set("savedQueries", JSON.stringify(queries));
          }

          const { issues } = response.data;

          this.printIssues(issues);
        } catch (error) {
          this.error(`${error.name} - ${error.message}`);
        }
        break;
      }
    }
  }

  async printIssues(issues: JiraIssue[]) {
    const choices = issues.map(issue => ({
      name: `${issue.key} - ${issue.fields.summary}`,
      value: issue
    }));
    const responses = await inquirer.prompt<{
      issue: JiraIssue;
      action: "branch" | "detail";
    }>([
      {
        name: "issue",
        message: "select an issue",
        type: "list",
        choices
      },
      {
        name: "action",
        message: "Action to take",
        type: "list",
        choices: ["branch", "detail"]
      }
    ]);

    if (responses.action === "branch") {
      const repo = await nodegit.Repository.open(process.cwd());
      const commit = await repo.getBranchCommit("master");
      const branch = await nodegit.Branch.create(
        repo,
        responses.issue.key,
        commit,
        0
      );
      await repo.checkoutBranch(branch);
      notifier.notify({
        title: "Switched to new branch",
        message: responses.issue.key
      });
    }

    if (responses.action === "detail") {
      this.log(prettyjson.render(responses.issue));
    }
  }
}
