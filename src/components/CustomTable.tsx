import type { JSX, ReactNode } from "react"
import { type Row, type RowData, type Table as TableInstance } from "@tanstack/react-table"

interface CustomTableProps<T extends RowData> {
  instance: TableInstance<T>
  isLoading?: boolean
  isError?: boolean
  limit?: number
  search?: string
  subComponent?: (props: { parentRow: Row<T> }) => JSX.Element
  onClickRow?: (row: Row<T>) => void
  errorComponent?: ReactNode
  noDataComponent?: ReactNode
  noVisibleColumnsComponent?: ReactNode
  noSearchResultsComponent?: ReactNode
  emptyContextMenuLabel?: string
}

export function CustomTable<T extends RowData>(props: CustomTableProps<T>) {
    void props
    return <div>Test</div>
}