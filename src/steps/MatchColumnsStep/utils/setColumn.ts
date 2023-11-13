import type { Field } from "../../../types"
import { Column, ColumnType, MatchColumnsProps } from "../MatchColumnsStep"
import { uniqueEntries } from "./uniqueEntries"

export const setColumn = <T extends string>(
  oldColumn: Column<T>,
  field?: Field<T>,
  data?: MatchColumnsProps<T>["data"],
  isCustomField?: boolean,
): Column<T> => {
  switch (field?.fieldType.type) {
    case "select":
      return {
        ...oldColumn,
        type: ColumnType.matchedSelect,
        value: field.key,
        matchedOptions: uniqueEntries(data || [], oldColumn.index),
        customField: isCustomField ? field : undefined,
      }
    case "checkbox":
      return {
        index: oldColumn.index,
        type: ColumnType.matchedCheckbox,
        value: field.key,
        header: oldColumn.header,
        customField: isCustomField ? field : undefined,
      }
    case "input":
      return {
        index: oldColumn.index,
        type: ColumnType.matched,
        value: field.key,
        header: oldColumn.header,
        customField: isCustomField ? field : undefined,
      }
    default:
      return {
        index: oldColumn.index,
        header: oldColumn.header,
        type: ColumnType.empty,
      }
  }
}
