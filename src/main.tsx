import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)

const setupRevealAnimations = () => {
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal:not(.process-stage):not(.reveal-delayed)')
  const delayedRevealElements = document.querySelectorAll<HTMLElement>('.reveal-delayed')
  const warumTriggers = document.querySelectorAll<HTMLElement>('.warum-trigger')
  const processStages = document.querySelectorAll<HTMLElement>('.process-stage')

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.07,
      rootMargin: '0px 0px 4% 0px',
    }
  )

  const delayedRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.5) {
          entry.target.classList.add('is-visible')
          delayedRevealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.5],
      rootMargin: '0px 0px 0px 0px',
    }
  )

  const warumTriggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.22) {
          entry.target.classList.add('is-visible')
          warumTriggerObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.22],
      rootMargin: '0px 0px -8% 0px',
    }
  )

  const processRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.26) {
          entry.target.classList.add('is-visible')
          processRevealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.26],
      rootMargin: '0px 0px 0px 0px',
    }
  )

  const processSequenceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.34) {
          entry.target.classList.add('is-sequenced')
          processSequenceObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.34],
      rootMargin: '0px 0px -4% 0px',
    }
  )

  revealElements.forEach((el) => revealObserver.observe(el))
  delayedRevealElements.forEach((el) => delayedRevealObserver.observe(el))
  warumTriggers.forEach((el) => warumTriggerObserver.observe(el))
  processStages.forEach((el) => {
    processRevealObserver.observe(el)
    processSequenceObserver.observe(el)
  })
}

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setupRevealAnimations()
  })
})
