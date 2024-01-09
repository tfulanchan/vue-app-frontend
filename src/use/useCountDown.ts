import { ref, computed } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf'

type CurrentTime = {
  days: number
  hours: number
  minutes: number
  second: number
  millisecond: number
  total: number
}
type UseCountDownOptions = {
  time: number,
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR 

const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor(time % DAY / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % HOUR) / SECOND)
  const milliseconds = Math.floor((time % HOUR) / MINUTE)

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: time,
  }
}
const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options: UseCountDownOptions) {
  const remain = ref(options.time)
  let endTime: number
  let counting: boolean
  const current = computed(() =>   parseTime(remain))
  let rAFId: number

  const pause = () => {
    counting = false
    cancelRAF(rAFId)
  }

  const getCurrentRemain = () => Math.max(endTime - Date.now())

  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)

    if (value === 0){
      pause()
      options.onFinish?.()
    }
  }

  const microTick = () => {
    rAFId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        setRemain(remain)

        if (remain.value > 0){
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    rAFId = rAF(() => {
      if (counting){
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || remainRemain){
          setRemain(remainRemain)
        }
        setRemain(remainRemain)

        if (remain.value > 0){
          macroTick()
        }
      }
    })
  }
  
  const tick = () => {
    if (options.millisecond){
      microTick()
    }else {
      macroTick()
    }
  }
  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }
  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }
  return {
    start,
    pause,
    reset,
    current
  }
}