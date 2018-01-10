import { addClass, removeClass } from "./helpers";

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, binding) {
        console.log(binding)
        let span = document.createElement('span')
        let text = document.createTextNode(`Seats available: ${binding.value.seats }`)
        span.appendChild(text)
        addClass(span, 'tooltip')
        el.appendChild(span)
        let div = el.getElementsByTagName('div')[0]
        div.addEventListener('mouseover', function () {
          addClass(span, 'tooltip-show')
        })
        div.addEventListener('mouseout', function () {
          removeClass(span, 'tooltip-show')
        })
      },
      unbind(el) {
        let div = el.getElementsByTagName('div')[0]
        div.addEventListener('mouseover', function () {
          addClass(span, 'tooltip-show')
        })
        div.addEventListener('mouseout', function () {
          removeClass(span, 'tooltip-show')
        })
      }
    })
  }
}