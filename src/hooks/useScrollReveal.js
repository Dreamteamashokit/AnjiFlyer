// useScrollReveal.js — Custom React hook
// Watches when an element enters the viewport and returns a "visible" flag.
// Components use this to trigger their fade-in animation.

import { useRef, useState, useEffect } from 'react'

/**
 * @param {number} threshold - How much of the element must be visible (0–1)
 * @param {number} delay     - Extra delay in ms before marking visible
 * @returns {[ref, boolean]} - Attach `ref` to your element; `visible` flips true on scroll
 */
export function useScrollReveal(threshold = 0.15, delay = 0) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait the optional delay, then mark as visible
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el) // Only animate once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay])

  return [ref, visible]
}
