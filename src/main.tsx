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
        if (entry.intersectionRatio >= 0.24) {
          entry.target.classList.add('is-visible')
          warumTriggerObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.24],
      rootMargin: '0px 0px -4% 0px',
    }
  )

  const processRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.24) {
          entry.target.classList.add('is-visible')
          processRevealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: [0.24],
      rootMargin: '0px 0px 0px 0px',
    }
  )

  revealElements.forEach((el) => revealObserver.observe(el))
  delayedRevealElements.forEach((el) => delayedRevealObserver.observe(el))
  warumTriggers.forEach((el) => warumTriggerObserver.observe(el))
  processStages.forEach((el) => {
    processRevealObserver.observe(el)
  })

  const handleProcessSequence = () => {
    const viewportTrigger = window.innerHeight * 0.74

    processStages.forEach((stage) => {
      if (stage.classList.contains('is-sequenced')) return

      const rect = stage.getBoundingClientRect()
      const stageCenter = rect.top + rect.height * 0.5

      const triggerReached = stageCenter <= viewportTrigger
      const stillOnScreen = rect.bottom > window.innerHeight * 0.08

      if (triggerReached && stillOnScreen) {
        stage.classList.add('is-sequenced')
      }
    })
  }

  handleProcessSequence()
  window.addEventListener('scroll', handleProcessSequence, { passive: true })
  window.addEventListener('resize', handleProcessSequence)
}




requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setupRevealAnimations()
    setupContactFormAjax()
  })
})


const setupContactFormAjax = () => {
  const doc = document as Document & { __nautilusContactAjaxBound?: boolean }

  if (doc.__nautilusContactAjaxBound) return
  doc.__nautilusContactAjaxBound = true

  document.addEventListener(
    'submit',
    async (event) => {
      const target = event.target as HTMLFormElement | null
      if (!target || target.id !== 'contact-form') return

      event.preventDefault()
      event.stopPropagation()

      const form = target
      const button = document.getElementById('contact-form-button') as HTMLButtonElement | null
      const status = document.getElementById('contact-form-status') as HTMLParagraphElement | null

      if (button) {
        button.disabled = true
        button.classList.add('opacity-70', 'cursor-not-allowed')
      }

      if (status) {
        status.textContent = 'Anfrage wird gesendet...'
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json',
          },
        })

        if (response.ok) {
          form.reset()
          if (status) {
            status.textContent = 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah.'
          }
        } else {
          let message = 'Beim Senden ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.'
          try {
            const data = await response.json()
            if (data && Array.isArray(data.errors) && data.errors.length > 0) {
              message = data.errors
                .map((error: { message?: string }) => error.message)
                .filter(Boolean)
                .join(', ')
            }
          } catch {
            // ignore
          }
          if (status) {
            status.textContent = message
          }
        }
      } catch {
        if (status) {
          status.textContent = 'Beim Senden ist ein technisches Problem aufgetreten. Bitte versuchen Sie es erneut.'
        }
      } finally {
        if (button) {
          button.disabled = false
          button.classList.remove('opacity-70', 'cursor-not-allowed')
        }
      }
    },
    true
  )
}

