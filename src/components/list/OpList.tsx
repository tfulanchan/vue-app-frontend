import { createNamespace } from "vant/lib/utils";
import { defineComponent } from "vue";

const [name, bem] = createNamespace('list')

export default defineComponent ({
  name,
  props: {},
  setup(props, { slots }) {
    return () => {
      const Content = slots.default?.()
      const Placeholder = <div ref={placeholder} class={bem('placeholder')}
      return {
        <div ref={root} class={bem()}>
          {props.direction === 'down' ? Content : Placeholder}
          {renderLoading()}
          {renderFinishedText()}
          {props.direction === 'up' ? Content : Placeholder}
        </div>
      }
    }
  }

})