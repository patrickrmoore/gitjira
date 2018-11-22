jiragit
=======

CLI to create branches from Jira issues

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jiragit.svg)](https://npmjs.org/package/jiragit)
[![Downloads/week](https://img.shields.io/npm/dw/jiragit.svg)](https://npmjs.org/package/jiragit)
[![License](https://img.shields.io/npm/l/jiragit.svg)](https://github.com/patrickrmoore/gitjira/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jiragit
$ gj COMMAND
running command...
$ gj (-v|--version|version)
jiragit/0.0.1 win32-x64 node-v8.9.0
$ gj --help [COMMAND]
USAGE
  $ gj COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gj config [KEY] [VALUE]`](#gj-config-key-value)
* [`gj help [COMMAND]`](#gj-help-command)
* [`gj issue [KEY]`](#gj-issue-key)
* [`gj query [KEY]`](#gj-query-key)

## `gj config [KEY] [VALUE]`

Get/set config values

```
USAGE
  $ gj config [KEY] [VALUE]

OPTIONS
  -a, --all
  -h, --help  show CLI help

EXAMPLES
  $ gj config username
  username=patrick.moore@hcss.com
  $ gj config username elise.ingram@hcss.com
  username=elise.ingram@hcss.com
  (was patrick.moore@hcss.com)
```

_See code: [src\commands\config.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.1/src\commands\config.ts)_

## `gj help [COMMAND]`

display help for gj

```
USAGE
  $ gj help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src\commands\help.ts)_

## `gj issue [KEY]`

Get a single issue

```
USAGE
  $ gj issue [KEY]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ gj issue HB-4820
  HB-4820 (Status: In Development)
  When a user deletes an item, they should get a confirmation box
```

_See code: [src\commands\issue.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.1/src\commands\issue.ts)_

## `gj query [KEY]`

Query Jira issues

```
USAGE
  $ gj query [KEY]

OPTIONS
  -f, --fields=fields          list of fields to return (comma delimited)
  -h, --help                   show CLI help
  -m, --maxResults=maxResults  limit to [n] results
  -p, --project=project        project
  -s, --startAt=startAt        index to start at
  -v, --fixVersion=fixVersion  fix version (enclosed in quotes)

EXAMPLES
  $ gj query -v "2018.1"
  $ gj query -m 10 -s 5
  $ gj query -p HB
```

_See code: [src\commands\query.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.1/src\commands\query.ts)_
<!-- commandsstop -->
