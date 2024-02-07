import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/solid-table'
import type { Component } from 'solid-js'

import { FileEdit, Trash, View } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Toaster, toast } from '@/components/ui/toaster'
import { trpc } from '@/lib/trpc/client'
import {
  createColumnHelper,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/solid-table'
import { For, createSignal } from 'solid-js'

type DataCollectionTableItem = {
  collection: string
  extension: string
  slug: string
}
interface DataCollectionTableProps {
  items: DataCollectionTableItem[]
}

function handleDelete(items: ReadonlyArray<DataCollectionTableItem>) {
  toast.promise(
    trpc.cms.delete.mutate(
      items.map(({ collection, extension, slug }) => ({
        collection,
        extension,
        slug
      }))
    ),
    {
      error: (error) => {
        if (error instanceof Error) {
          return {
            description: error.message,
            title: 'Error'
          }
        }
        return {
          description: 'Something went wrong. Please try again.',
          title: 'Error'
        }
      },
      loading: { title: 'Deleting...' },
      success: () => ({ title: 'Deleted!' })
    }
  )
}

const columnHelper = createColumnHelper<DataCollectionTableItem>()
const columns = [
  columnHelper.display({
    cell: (props) => (
      <Checkbox
        aria-label='Select row'
        checked={props.row.getIsSelected()}
        onChange={(value) => props.row.toggleSelected(!!value)}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: (props) => (
      <Checkbox
        aria-label='Select all'
        checked={props.table.getIsAllPageRowsSelected()}
        indeterminate={props.table.getIsSomePageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: 'select'
  }),
  columnHelper.accessor('slug', {
    cell: (info) => info.getValue(),
    header: 'Slug'
  }),

  columnHelper.display({
    cell: (props) => {
      const collection = () => props.row.original.collection
      const slug = () => props.row.original.slug
      return (
        <div class='inline-flex items-center gap-2'>
          <a
            class={buttonVariants({ size: 'icon', variant: 'link' })}
            href={`/${collection()}/${slug()}`}
          >
            <View class='size-4' />
          </a>
          <a
            class={buttonVariants({ size: 'icon', variant: 'link' })}
            href={`/${collection()}/${slug()}/edit`}
          >
            <FileEdit class='size-4' />
          </a>
          <Button
            onClick={() => handleDelete([props.row.original])}
            size='icon'
            variant='link'
          >
            <Trash class='size-4' />
          </Button>
        </div>
      )
    },
    enableHiding: false,
    id: 'actions'
  })
]

export const DataCollectionTable: Component<DataCollectionTableProps> = (
  props
) => {
  const [sorting, setSorting] = createSignal<SortingState>([])
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {}
  )
  const [rowSelection, setRowSelection] = createSignal({})

  const table = createSolidTable<DataCollectionTableItem>({
    columns,
    get data() {
      return props.items
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      get columnFilters() {
        return columnFilters()
      },
      get columnVisibility() {
        return columnVisibility()
      },
      get rowSelection() {
        return rowSelection()
      },
      get sorting() {
        return sorting()
      }
    }
  })

  return (
    <div class='w-full'>
      <div class='flex items-center' />
      <Table>
        <TableHeader>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <TableHead>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>
        <TableBody>
          <For
            each={table.getRowModel().rows}
            fallback={
              <TableRow>
                <TableCell class='h-24 text-center' colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            }
          >
            {(row) => (
              <TableRow>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <TableCell>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
      <Separator />
      <div class='flex items-center justify-end space-x-2 p-4'>
        <div class='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div class='space-x-2'>
          <Button
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            onClick={() =>
              handleDelete(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map(({ original }) => original)
              )
            }
            size='sm'
            variant='outline'
          >
            <Trash class='size-3' />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size='sm'
            variant='outline'
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size='sm'
            variant='outline'
          >
            Next
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
