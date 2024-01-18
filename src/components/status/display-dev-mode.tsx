import type { Component } from 'solid-js'

import { AlertTriangle } from '@/components/icons'
const isDev = import.meta.env.DEV
export const DisplayDevMode: Component = () =>
  isDev && (
    <div class='flex items-center bg-warning p-1 text-sm text-warning-foreground'>
      <AlertTriangle class='mr-2 inline-block size-3' /> You are currently in
      local development mode.
    </div>
  )
