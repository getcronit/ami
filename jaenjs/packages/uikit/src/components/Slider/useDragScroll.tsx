import {useState, useEffect, useCallback} from 'react'

export interface UseDragScrollProps {
  sliderRef: React.RefObject<HTMLDivElement>
  reliants: Array<any>
  momentumVelocity?: number
  captureHorizontalScroll?: boolean
}

const useDragScroll = ({
  sliderRef,
  reliants = [],
  momentumVelocity = 0.9,
  captureHorizontalScroll = false
}: UseDragScrollProps) => {
  const [hasSwiped, setHasSwiped] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const slider = sliderRef.current

    if (slider) {
      const sliderWidth = slider.offsetWidth
      const sliderScrollLeft = slider.scrollLeft

      const sliderScrollWidth = slider.scrollWidth

      const sliderScrollRight = sliderScrollWidth - sliderWidth

      setCanScrollLeft(sliderScrollLeft > 0)
      setCanScrollRight(sliderScrollLeft < sliderScrollRight)
    }
  }, [sliderRef])

  const init = useCallback(() => {
    const slider = sliderRef.current

    if (!slider) {
      return
    }

    checkScroll()

    let isDown = false
    let startX: number = 0
    let scrollLeft: number = 0

    slider.addEventListener('mousedown', e => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
      cancelMomentumTracking()
    })

    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })

    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
      beginMomentumTracking()
      setTimeout(() => {
        setHasSwiped(false)
        checkScroll()
      }, 0)
    })

    slider.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 //scroll-fast
      let prevScrollLeft = slider.scrollLeft
      slider.scrollLeft = scrollLeft - walk
      velX = slider.scrollLeft - prevScrollLeft
      if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
        setHasSwiped(true)
        checkScroll()
      }
    })

    if (captureHorizontalScroll) {
      slider.addEventListener('wheel', e => {
        e.preventDefault()
        const delta = e.deltaY

        slider.scrollLeft += delta
        checkScroll()
      })
    }

    // Momentum
    let velX = 0
    let momentumID: number | null = null

    slider.addEventListener('wheel', e => {
      cancelMomentumTracking()
    })

    function beginMomentumTracking() {
      cancelMomentumTracking()
      momentumID = requestAnimationFrame(momentumLoop)
    }
    function cancelMomentumTracking() {
      if (momentumID) {
        cancelAnimationFrame(momentumID)
      }
    }
    function momentumLoop() {
      if (!slider) return

      slider.scrollLeft += velX
      velX *= momentumVelocity
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop)
      }
    }
  }, [sliderRef, reliants])

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      // scroll clientWidth to the right
      if (!sliderRef.current) return

      const slider = sliderRef.current

      const scrollLeft = slider.scrollLeft
      const clientWidth = slider.clientWidth

      const scrollTo = scrollLeft + clientWidth
      const scrollDiff = scrollTo - scrollLeft

      const scrollStep = scrollDiff / 10
      let scrollCount = 0

      const scrollInterval = setInterval(() => {
        scrollCount++

        if (direction === 'left') {
          slider.scrollLeft -= scrollStep
        }

        if (direction === 'right') {
          slider.scrollLeft += scrollStep
        }

        if (scrollCount === 10) {
          checkScroll()

          clearInterval(scrollInterval)
        }
      }, 10)
    },
    [sliderRef]
  )

  useEffect(() => {
    init()
  }, [...reliants])

  return {
    hasSwiped,
    scroll,
    canScrollLeft,
    canScrollRight
  }
}

export default useDragScroll
