import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { CustomTable } from "./CustomTable"

interface BarData {
    id: number
    name: string
}

export function BarPage() {
    const tableInstance = useReactTable({
        data: [] as Array<BarData>,
        columns: [] as Array<ColumnDef<BarData>>,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <CustomTable
                instance={tableInstance}
                subComponent={({ parentRow }) => {
                    console.log(parentRow.original.name)
                    return <div>Test</div>
                }}
            />
        </div>
    )
}