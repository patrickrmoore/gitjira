export interface JiraSearchParams {
  startAt?: number;
  maxResults?: number;
  project?: string;
  fixVersion?: string;
  jql?: string;
  status?: string;
  fields?: string;
}

export interface JiraSearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraIssue[];
}

export interface JiraIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface Fields {
  issuetype: Issuetype;
  timespent?: number;
  project: Project;
  fixVersions: FixVersionsEntity[];
  aggregatetimespent?: number;
  resolution?: ProjectCategoryOrResolution;
  priority: Priority;
  labels: string[];
  assignee?: AssigneeOrCreatorOrReporter;
  updated: string;
  status: Status;
  components?: ComponentsEntity[];
  description?: string;
  summary: string;
  subtasks?: any;
  parent?: Parent;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  projectCategory: ProjectCategoryOrResolution;
}

export interface FixVersionsEntity {
  self: string;
  id: string;
  description: string;
  name: string;
  archived: boolean;
  released: boolean;
}
export interface ProjectCategoryOrResolution {
  self: string;
  id: string;
  description: string;
  name: string;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface AssigneeOrCreatorOrReporter {
  self: string;
  name: string;
  key: string;
  accountId: string;
  emailAddress: string;
  displayName: string;
  active: boolean;
  timeZone: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface ComponentsEntity {
  self: string;
  id: string;
  name: string;
}

export interface Parent {
  id: string;
  key: string;
  self: string;
  fields: FieldsForParent;
}
export interface FieldsForParent {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype;
}
