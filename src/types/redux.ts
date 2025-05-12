export interface TagObject {
  id: string;
}

export interface Tag {
  type: string;
  id: string;
}

export interface ProvidesTagsOptions {
  selectId?: (item: any) => string | undefined;
}

export interface InvalidateTagsOptions {
  ids?: string[];
}
