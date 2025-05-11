import { InvalidateTagsOptions, Tag } from "types/redux";

export function invalidatesTags(
  tagType: string,
  options: InvalidateTagsOptions = {}
): Tag[] {
  const { ids = [] } = options;
  const result: Tag[] = [
    { type: tagType, id: "LIST" },
    ...ids.map((id) => ({ type: tagType, id })),
  ];

  return result;
}
