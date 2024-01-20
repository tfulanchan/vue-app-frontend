import type ActionsHandler from '../base/ActionsHandler'
import type Behavior from './Behavior'
import { EventEmitter } from '../shared-utils/event'
import type { Animater, IPoint } from '../animator'
import type { Options } from '../Options'
import { getTime, between } from '../shared-utils/lang'

export default class ScrollerActions {
  hooks: EventEmitter
  enabled: boolean
  contentMoved!: boolean
  startTime!: number
  endTime!: number

  constructor(
    public scrollBehaviorX: Behavior,
    public scrollBehaviorY: Behavior,
    public actionsHandler: ActionsHandler,
    public animater: Animater,
    public options: Options
  ) {
    this.hooks = new EventEmitter(['start', 'scrollStart', 'scroll', 'scrollEnd'])
    this.enabled = true
    this.bindActionsHandler()
  }
  private bindActionsHandler() {
    const eventTypes = [
      { event: 'start', handler: this.handleStart.bind(this) },
      { event: 'move', handler: this.handleMove.bind(this) },
      { event: 'end', handler: this.handleEnd.bind(this) }
    ]
    const hooks = this.actionsHandler.hooks
    eventTypes.forEach(({ event, handler }) => {
      hooks.on(hooks.eventTypes[event], (...args: [number & TouchEvent, number & TouchEvent]) => {
        if (!this.enabled) {
          return true
        }
        return handler(...args)
      })
    })
  }
  private handleStart() {
    this.contentMoved = false
    this.startTime = getTime()
    // stop scrolling forcefully
    this.animater.doStop()
    this.scrollBehaviorX.resetStartPos()
    this.scrollBehaviorY.resetStartPos()
    this.hooks.emit(this.hooks.eventTypes.start, this.getCurrentPos())
  }
  private handleMove(deltaX: number, deltaY: number) {
    const prevX = this.scrollBehaviorX.getCurrentPos()
    const prevY = this.scrollBehaviorY.getCurrentPos()
    // get new coordinate of X
    const newX = this.scrollBehaviorX.move(deltaX)
    const newY = this.scrollBehaviorY.move(deltaY)
    // determine if location is changed
    const positionChanged = newX !== prevX || newY !== prevY
    // if container if not moved and location is changed, start scrolling phase
    if (!this.contentMoved && positionChanged) {
      this.contentMoved = true
      this.hooks.emit(this.hooks.eventTypes.scrollStart, this.getCurrentPos())
    }
    // if container is currently moving and location is changed, currently in scrolling phase
    if (this.contentMoved && positionChanged) {
      this.animater.translate({
        x: newX,
        y: newY
      })
    }
    this.hooks.emit(this.hooks.eventTypes.scroll, this.getCurrentPos())
  }
  private handleEnd(e: TouchEvent) {
    let currentPos = this.getCurrentPos()
    // expose an end event, external can listen to end event to implement forbidding scrolling
    if (this.hooks.emit(this.hooks.eventTypes.end, e, currentPos)) {
      return true
    }
    currentPos = this.ensureIntegerPos(currentPos)
    this.animater.translate(currentPos)
    this.endTime = getTime()
    const duration = this.endTime - this.startTime
    this.hooks.emit(this.hooks.eventTypes.scrollEnd, currentPos, duration)
  }
  // ensure coordinates is valid
  private ensureIntegerPos(currentPost: IPoint) {
    let { x, y } = currentPost
    x = x > 0 ? Math.ceil(x): Math.floor(x)
    y = y > 0 ? Math.ceil(y): Math.floor(y)
    x = between(x, this.scrollBehaviorX.maxScrollPos, this.scrollBehaviorX.minScrollPos)
    y = between(y, this.scrollBehaviorY.maxScrollPos, this.scrollBehaviorY.minScrollPos)
    return { x, y }
  }
  getCurrentPos() {
    return {
      x: this.scrollBehaviorX.getCurrentPos(),
      y: this.scrollBehaviorY.getCurrentPos(),
    }
  }
  destroy() {
    this.hooks.destroy
  }
}
