import './style.css'

const accordions = document.querySelectorAll('details.app-accordion')

accordions.forEach((accordion) => {
  accordion.addEventListener('toggle', () => {
    if (!accordion.open) return

    accordions.forEach((other) => {
      if (other !== accordion) other.open = false
    })
  })
})
