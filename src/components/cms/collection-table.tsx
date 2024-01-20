import type { Component } from 'solid-js'

import { FileEdit, Trash } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { For } from 'solid-js'

interface CollectionTableItem {
  collection: string
  description?: string
  extension: string
  slug: string
  title: string
}
interface CollectionTableProps {
  items: CollectionTableItem[]
}
export const CollectionTable: Component<CollectionTableProps> = (props) => {
  function handleDelete(item: CollectionTableItem) {
    toast.promise(trpc.cms.delete.mutate([item]), {
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
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Slug</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={props.items}>
          {(item) => (
            <TableRow>
              <TableCell>{item.slug}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell class='flex gap-1'>
                <a
                  class={buttonVariants({ size: 'icon', variant: 'ghost' })}
                  href={`/admin/${item.collection}/${item.slug}`}
                >
                  <FileEdit class='size-4' />
                </a>
                <Button
                  onClick={() => handleDelete(item)}
                  size='icon'
                  variant='ghost'
                >
                  <Trash class='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
      <Toaster />
    </Table>
  )
}
