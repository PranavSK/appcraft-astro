import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/solid-table'
import type { Component } from 'solid-js'

import { FileEdit, MoreHorizontal, Trash } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown'
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
import { As } from '@kobalte/core'
import { createMediaQuery } from '@solid-primitives/media'
import {
  createColumnHelper,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/solid-table'
import { For, Show, createEffect, createSignal } from 'solid-js'

type ContentCollectionTableItem = {
  collection: string
  description?: string
  extension: string
  slug: string
  title: string
}
interface ContentCollectionTableProps {
  items: ContentCollectionTableItem[]
}

function handleDelete(items: ReadonlyArray<ContentCollectionTableItem>) {
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

const columnHelper = createColumnHelper<ContentCollectionTableItem>()
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
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: 'Title'
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: 'Description'
  }),
  columnHelper.display({
    cell: (props) => {
      const collection = () => props.row.original.collection
      const slug = () => props.row.original.slug
      const isMediaLg = createMediaQuery('(min-width: 1024px)')
      const description = () => {
        const cell = props.row
          .getAllCells()
          .find((cell) => cell.column.id === 'description')
        if (cell)
          return flexRender(cell.column.columnDef.cell, cell.getContext())
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <As class='size-8 p-0' component={Button} variant='ghost'>
              <span class='sr-only'>Open menu</span>
              <MoreHorizontal class='size-4' />
            </As>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Show when={!isMediaLg()}>
              <DropdownMenuLabel>Description</DropdownMenuLabel>
              <span class='px-2 py-1.5 text-sm'>{description()}</span>
              <DropdownMenuSeparator />
            </Show>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <As component='a' href={`/${collection()}/${slug()}`}>
                View page
              </As>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <As component='a' href={`/${collection()}/${slug()}/edit`}>
                <FileEdit class='mr-2 size-4' />
                Edit page
              </As>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete([props.row.original])}
            >
              <Trash class='mr-2 size-4' /> Delete page
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
    id: 'actions'
  })
]

export const ContentCollectionTable: Component<ContentCollectionTableProps> = (
  props
) => {
  const [sorting, setSorting] = createSignal<SortingState>([])
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {}
  )
  const [rowSelection, setRowSelection] = createSignal({})

  const table = createSolidTable<ContentCollectionTableItem>({
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

  const isMediaLg = createMediaQuery('(min-width: 1024px)')

  createEffect(() => {
    table.getColumn('description')?.toggleVisibility(isMediaLg())
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
