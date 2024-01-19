import { EventEmitter } from '@/utils/event'
let eventBus: EventEmitter

export function useEventBus() {
  // single instance module
  if (!eventBus) {
    eventBus = new EventEmitter()
  }
  return eventBus
}