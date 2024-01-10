import type { App, DirectiveBinding } from 'vue'

const vLazy = (observer: IntersectionObserver) => {
  return {
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.classList.add('op-lazyload')
      const { value } = binding
      // <img data-origin="" />
      if (value) {
        el.dataset.origin = value
        observer.observe(el)
      }
    },
    beforeUpdate: (el: HTMLImageElement) => {
      observer.unobserve(el)
    },
    updated: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.dataset.origin = binding.value
      observer.observe(el)
    },
    unmounted: (el: HTMLImageElement) => {
      observer.unobserve(el)
    },
  }
}

const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
          // start loading image and send value of data-origin to src
            const el = item.target as HTMLImageElement
            el.src = el.dataset.origin as string
            el.classList.remove('op-lazyload')
          // stop observering
            observer.unobserve(el)
          }
        })
      },
      {
      // image 100px then send event
        rootMargin: '0px 0px -100px 0px',
      }
    )
    app.directive('lazy', vLazy(observer))
  },
}

export default lazyPlugin