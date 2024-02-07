import type { Component } from 'solid-js'

import { Save } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/toaster'
import { createMediaQuery } from '@solid-primitives/media'
import { Show, createEffect, createSignal } from 'solid-js'

interface SaveButtonProps {
  class?: string
  initialSlug: string
  onSave?: (slug: string, message: string) => Promise<void>
}
export const SaveButton: Component<SaveButtonProps> = (props) => {
  const [slug, setSlug] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    setSlug(props.initialSlug)
  })

  function handleSave() {
    if (props.onSave) {
      toast.promise(props.onSave(slug(), message()), {
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
        loading: {
          title: 'Saving...'
        },
        success: () => ({
          title: 'Saved!'
        })
      })
    } else {
      toast.error({
        description: 'No onSave function provided.',
        title: 'Error'
      })
    }
    setOpen(false)
  }

  const Title = () => <>Confirm Save</>
  const Description = () => (
    <>
      Are you sure you want to save this document?
      <br />
      Choose a new value for the slug if you want to create a new document.
      <br />
      <span class='text-warning-foreground'>
        Warning: This will overwrite the existing document.
      </span>
    </>
  )

  const Form = () => (
    <div class='grid gap-4 py-4'>
      <div class='grid grid-cols-4 items-center gap-4'>
        <Label class='text-right' for='slug'>
          Slug
        </Label>
        <Input
          class='col-span-3'
          id='slug'
          onChange={(event) => setSlug(event.target.value)}
          value={slug()}
        />
      </div>
      <div class='grid grid-cols-4 items-center gap-4'>
        <Label class='text-right' for='message'>
          Message
        </Label>
        <Input
          class='col-span-3'
          id='message'
          onChange={(event) => setMessage(event.target.value)}
          placeholder='Add an optional message to the commit...'
          value={message()}
        />
      </div>
    </div>
  )

  const Footer = () => {
    return <Button onClick={handleSave}>Confirm</Button>
  }

  const isMediaLg = createMediaQuery('(min-width: 1024px)', true)

  return (
    <Show
      fallback={
        <Sheet onOpenChange={setOpen} open={open()}>
          <SheetTrigger
            class={buttonVariants({
              class: props.class,
              size: 'sm',
              variant: 'ghost'
            })}
          >
            <Save class='size-4' />
          </SheetTrigger>
          <SheetContent position='bottom' size='xl'>
            <SheetHeader>
              <SheetTitle>
                <Title />
              </SheetTitle>
              <SheetDescription>
                <Description />
              </SheetDescription>
              <Form />
              <SheetFooter>
                <Footer />
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      }
      when={isMediaLg()}
    >
      <Dialog onOpenChange={setOpen} open={open()}>
        <DialogTrigger
          class={buttonVariants({
            class: props.class,
            size: 'sm',
            variant: 'ghost'
          })}
        >
          <Save class='size-4' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Title />
            </DialogTitle>
            <DialogDescription>
              <Description />
            </DialogDescription>
          </DialogHeader>
          <Form />
          <DialogFooter>
            <Footer />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Show>
  )
}
