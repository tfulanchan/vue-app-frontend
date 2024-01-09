import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { createNamespace } from 'vant/lib/utils'
import { clamp } from '@/utils/format'
import { doubleRaf } from '@/utils/raf'
import { useChildren, type NotNullChild } from '@/use/useChildren'
import { useParent } from '@/use/useParent'
import type { ComponentInternalInstance } from 'vue'
import ''

// 5-26
const [name, bem] = createNamespace('swipe')

export const SWIPE_KEY = Symbol(name)

export type SwipeState = {
  rect: { width: number; height: number } | null
  width: number
  height: number
  offset: number
  active: number
  swiping: boolean
}

export default defineComponent({
  name,
  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    },
    loop: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const root = ref()
    const track = ref()
    const state = reactive<SwipeState>({
      rect: null,
      offset: 0,
      width: 0,
      height: 0,
      active: 0,
      swiping: false
    })
    const { children, linkChildren } = useChildren(SWIPE_KEY)
    const count = computed(() => children.length)
    const size = computed(() => state[props.vertical ? 'height' : 'width'])
    const trackSize = computed(() => count.value * size.value)
    const trackStyle = computed(() => {
      const mainAxis = props.vertical ? 'height' : 'width'
      const style = {
        transitionDuration: `${state.swiping ? 0 : props.duration}`,
        transform: `translate${props.vertical ? 'Y' : 'X'}(${state.offset}px)`,
        [mainAxis]: `${trackSize.value}px`
      }
      return style
    })
    const minOffset = computed(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width
        return base - trackSize.value
      }
      return 0
    })

    const activeIndicator = computed(() => {
      return (state.active + count.value) % count.value
    })

    const getTargetActive = (pace: number) => {
      const { active } = state
      if (pace) {
        if (props.loop) {
          return clamp(active + pace, -1, count.value)
        }
        return clamp(active + pace, 0, count.value - 1)
      }
      return active
    }

    const getTargetOffset = (targetActive: number, offset = 0) => {
      const currentPosition = targetActive * size.value
      const targetOffset = offset - currentPosition
      return targetOffset
    }

    const move = ({ pace = 0, offset = 0 }) => {
      if (count.value <= 1) {
        return
      }
      const targetActive = getTargetActive(pace)
      const targetOffset = getTargetOffset(targetActive, offset)
      if (props.loop) {
        // scrolling left to right
        // 5-27
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset > 0
          children[0].setOffset(outRightBound ? trackSize.value : 0)
        }
        // right to left
        if (children[count.value - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          (children[count.value - 1] as NotNullChild).setOffset(
            outLeftBound ? -trackSize.value : 0
          )
        }
      }
      state.active = targetActive
      state.offset = targetOffset
    }

    const correctPosition = () => {
      state.swiping = true
      if (state.active <= -1) {
        move({ pace: count.value })
      } else if (state.active >= count.value) {
        move({ pace: -count.value })
      }
    }

    const next = () => {
      correctPosition()
      doubleRaf(() => {
        state.swiping = false
        move({
          pace: 1
        })
      })
    }

    let timeout: number
    const stopAutoPlay = () => clearTimeout(timeout)
    const autoplay = () => {
      stopAutoPlay()
      if (props.autoplay > 0 && count.value > 1) {
        timeout = setTimeout(() => {
          next()
          autoplay()
        }, props.autoplay)
      }
    }

    const init = () => {
      if (!root.value) {
        return
      }
      const rect = {
        width: root.value?.offsetWidth,
        height: root.value?.offsetHeight
      }
      state.rect = rect
      state.width = rect.width
      state.height = rect.height
      autoplay()
    }

    const renderDot = (_: string, index: number) => {
      const active = index == activeIndicator.value
      return <i class={bem('indicator', { active })}></i>
    }

    // 5-28
    const renderIndicator = () => {
      if (props.showIndicators) {
        return <div class={bem('indicators')}>{Array(count.value).fill('').map(renderDot)}</div>
      }
    }

    linkChildren({
      size,
      props
    })

    onMounted(init)
    onBeforeUnmount(stopAutoPlay)
    watch(() => props.autoplay, autoplay)

    return () => (
      <div ref={root} class={bem()}>
        <div ref={track} style={trackStyle.value} class={bem('track')}>
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  }
})
