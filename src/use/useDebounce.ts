// interface IDebounceFn<T>{
//   (...args: T[]): void | Promise<void>
// }

// utils
// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number){
//   let timer: number | null = null
//   return function f(this: void, ...args: T[]){
//     if(timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, delay)   
//   }
// }
import type {Ref, UnwrapRef} from 'vue'
import {onUnmounted, ref, watch} from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: number | null = null

  // hook
  // watch(value, (nv) => {
    const unwatch = watch(value, (nv) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        debounceValue.value = nv as UnwrapRef<T>
      }, delay)
    })  

    onUnmounted(() => {
      unwatch()
    })
  return debounceValue

}