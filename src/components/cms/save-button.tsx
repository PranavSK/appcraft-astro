import type { SaveInput } from '@/lib/trpc/server/router'

import { MobileBottomPanel } from '@/components/mobile/bottom-panel'
import { Button } from '@/components/ui/button'
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/toaster'
import { trpc } from '@/lib/trpc/client'
import {
  type Component,
  type Setter,
  createEffect,
  createSignal
} from 'solid-js'

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

const Form = (props: { initialValue: string; setValue: Setter<string> }) => (
  <div class='grid gap-4 py-4'>
    <div class='grid grid-cols-4 items-center gap-4'>
      <Label class='text-right' for='slug'>
        Slug
      </Label>
      <Input
        class='col-span-3'
        id='slug'
        onChange={(event) => props.setValue(event.target.value)}
        value={props.initialValue}
      />
    </div>
  </div>
)

const Footer = (props: { onClick: () => void }) => {
  return <Button onClick={props.onClick}>Confirm</Button>
}

type SaveButtonProps = SaveInput
export const SaveButton: Component<SaveButtonProps> = (props) => {
  const [slug, setSlug] = createSignal('')

  createEffect(() => setSlug(props.slug === 'create-new' ? '' : props.slug))

  function handleSave() {
    toast.promise(trpc.cms.save.mutate({ ...props, slug: slug() }), {
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
  }

  return (
    <>
      <MobileBottomPanel
        class='lg:hidden'
        triggerAs={Button}
        triggerContent='Save'
      >
        <SheetHeader>
          <SheetTitle>
            <Title />
          </SheetTitle>
          <SheetDescription>
            <Description />
          </SheetDescription>
          <Form initialValue={slug()} setValue={setSlug} />
          <SheetFooter>
            <Footer onClick={handleSave} />
          </SheetFooter>
        </SheetHeader>
      </MobileBottomPanel>
      <Dialog>
        <DialogTrigger as={Button} class='hidden lg:block'>
          Save
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
          <Form initialValue={slug()} setValue={setSlug} />
          <DialogFooter>
            <Footer onClick={handleSave} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
