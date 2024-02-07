import type { ComponentProps, ParentComponent } from 'solid-js'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { extractZodDef } from '@/lib/zod'
import { ValidationMessage, reporter } from '@felte/reporter-solid'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'
import {
  For,
  Index,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  splitProps
} from 'solid-js'

export interface FormBuilderProps<S extends z.ZodTypeAny> {
  schema: S
}
export const FormBuilder = <S extends z.ZodTypeAny>(
  props: FormBuilderProps<S> &
    ComponentProps<'form'> & {
      initialValues?: z.infer<S>
      onDataChange?: (
        value: z.infer<S>[keyof z.infer<S>],
        key: keyof z.infer<S>
      ) => void
      onSubmit?: (values: z.infer<S>) => void
    }
) => {
  const [local, formProps, rest] = splitProps(
    props,
    ['schema', 'onDataChange'],
    ['onSubmit', 'initialValues']
  )
  const { data, errors, form, setData } = createForm({
    ...formProps,
    extend: [validator({ schema: local.schema }), reporter]
  })

  const formItems = createMemo(() => {
    const shape = extractZodDef(local.schema).shape()
    const items = Object.keys(shape).map((name) => {
      const { description, label } = shape[name]._def.metadata ?? {}
      const def = extractZodDef(shape[name])
      const zodType = def.typeName
      const extraValues = def.values

      createEffect(() => {
        const value = data()[name]
        try {
          local.onDataChange?.(shape[name].parse(value), name)
        } catch (e) {}
      })

      return {
        description,
        extraValues,
        label,
        name,
        zodType
      }
    })

    return items
  })

  const FormLabel: ParentComponent<{ for: string }> = (props) => (
    <Label
      classList={{ 'text-destructive': !!errors()[props.for] }}
      for={props.for}
    >
      {props.children}
    </Label>
  )

  const FormDescription: ParentComponent = (props) => (
    <Show when={props.children}>
      <p class='text-sm text-muted-foreground'>{props.children}</p>
    </Show>
  )

  return (
    <form {...rest} class='space-y-4' use:form>
      <For each={formItems()}>
        {({ description, extraValues, label, name, zodType }) => (
          <Switch
            fallback={
              <div class='space-y-2'>
                <FormLabel for={name}>{label}</FormLabel>
                <Input id={name} name={name} />
                <FormDescription>{description}</FormDescription>
                <ValidationMessage
                  as='ul'
                  class='text-sm font-medium text-destructive'
                  for={name}
                >
                  {(messages) => (
                    <Index each={messages ?? []}>
                      {(message) => <li>{message()}</li>}
                    </Index>
                  )}
                </ValidationMessage>
              </div>
            }
          >
            <Match when={zodType === 'ZodBoolean'}>
              <div class='flex flex-row items-start space-x-3 space-y-0 p-4'>
                <Checkbox
                  checked={data(name)}
                  id={name}
                  name={name}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(value) => setData(name as any, value as any)}
                />
                <div class='space-y-1 leading-none'>
                  <FormLabel for={name}>{label}</FormLabel>
                  <FormDescription>{description}</FormDescription>
                  <ValidationMessage
                    as='ul'
                    class='text-sm font-medium text-destructive'
                    for={name}
                  >
                    {(messages) => (
                      <Index each={messages ?? []}>
                        {(message) => <li>{message()}</li>}
                      </Index>
                    )}
                  </ValidationMessage>
                </div>
              </div>
            </Match>
            <Match when={zodType === 'ZodEnum'}>
              <div class='space-y-2'>
                <FormLabel for={name}>{label}</FormLabel>
                <Select
                  id={name}
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue as string}
                    </SelectItem>
                  )}
                  name={name}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(value) => setData(name as any, value)}
                  options={extraValues}
                  value={data(name)}
                >
                  <SelectTrigger class='bg-background'>
                    <SelectValue aria-placeholder={`Select for ${name}`}>
                      {(state) => state.selectedOption() as string}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
                <FormDescription>{description}</FormDescription>
                <ValidationMessage
                  as='ul'
                  class='text-sm font-medium text-destructive'
                  for={name}
                >
                  {(messages) => (
                    <Index each={messages ?? []}>
                      {(message) => <li>{message()}</li>}
                    </Index>
                  )}
                </ValidationMessage>
              </div>
            </Match>
          </Switch>
        )}
      </For>
      <Button type='submit'>Update State</Button>
    </form>
  )
}
