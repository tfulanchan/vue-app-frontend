import { EventEmitter as EE } from '@/utils/event'
import { addEvent, removeEvent } from './dom'

interface EventData {
  name: string
  handler(e: UIEvent): void
  capture?: boolean
}
type Fn = (...args: any[]) => void

export class EventEmitter extends EE {
  eventTypes: Record<string, string>
  constructor(names: string[]) {
    super()
    this.eventTypes = {}
    if (names) {
      this.registerType(names)
    }
  }
  private registerType(names: string[]) {
    names.forEach((type) => {
      this.eventTypes[type] = type
    })
  }
  destroy() {
    super.destroy()
    this.eventTypes = {}
  }
}

export class EventRegister {
  constructor(public wrapper: HTMLElement, public events: EventData[]) {
    this.addDOMEvents()
  }
  private addDOMEvents() {
    this.handlerDOMEvents(addEvent)
  }
  private removeDOMEvents() {
    this.handlerDOMEvents(removeEvent)
  }
  private handlerDOMEvents(eventOperation: Fn) {
    this.events.forEach((event: EventData) => {
      eventOperation(this.wrapper, event.name, event.handler, !!event.capture)
    })
  }
  destroy() {
    this.removeDOMEvents()
    this.addDOMEvents
  }
}