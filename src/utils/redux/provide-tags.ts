import { ProvidesTagsOptions, Tag, TagObject } from "types/redux";

export function providesTags<T extends TagObject>(
  resultsWithIds: T[] | null,
  tagType: string,
  options: ProvidesTagsOptions = {}
): Tag[] {
  const { selectId = (item: T) => item.id } = options;
  const listTag: Tag = { type: tagType, id: "LIST" };

  const result: Tag[] = resultsWithIds
    ? [
        listTag,
        ...resultsWithIds.map((result) => ({
          type: tagType,
          id: selectId(result), // Now we can directly access id
        })),
      ]
    : [listTag];

  return result;
}
