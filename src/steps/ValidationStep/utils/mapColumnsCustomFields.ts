import { Column } from "../../MatchColumnsStep/MatchColumnsStep"
import { Field } from "../../../types"

export const mapColumnsCustomFields = (columns: Column<string>[], fields: Field<string>[]) => {
  const mergedFields = [...fields] as Field<string>[]
  for (const e of columns) {
    if (!("customField" in e) || !e.customField) continue
    // insert dynamic fields into mergedFields at the index of the dynamic column
    mergedFields.splice(e.index, 0, e.customField)
  }
  return mergedFields
}
