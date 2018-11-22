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
jiragit/0.0.0 win32-x64 node-v8.9.0
$ gj --help [COMMAND]
USAGE
  $ gj COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gj config [FILE]`](#gj-config-file)
* [`gj hello [FILE]`](#gj-hello-file)
* [`gj help [COMMAND]`](#gj-help-command)
* [`gj issue [KEY]`](#gj-issue-key)
* [`gj query [KEY]`](#gj-query-key)

## `gj config [FILE]`

describe the command here

```
USAGE
  $ gj config [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\config.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.0/src\commands\config.ts)_

## `gj hello [FILE]`

describe the command here

```
USAGE
  $ gj hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gj hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.0/src\commands\hello.ts)_

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

describe the command here

```
USAGE
  $ gj issue [KEY]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\issue.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.0/src\commands\issue.ts)_

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
  -v, --fixVersion=fixVersion  fix version
```

_See code: [src\commands\query.ts](https://github.com/patrickrmoore/gitjira/blob/v0.0.0/src\commands\query.ts)_
<!-- commandsstop -->
