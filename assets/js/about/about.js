// YouTube video ID çıxarmaq
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }
  
  // Modal açmaq
  function openVideoModal(videoUrl) {
    const modal = document.getElementById("videoModal")
    const iframe = document.getElementById("videoIframe")
    const videoId = getYouTubeVideoId(videoUrl)
  
    if (videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      modal.classList.add("show")
      document.body.style.overflow = "hidden"
    }
  }
  
  // Modal bağlamaq
  function closeVideoModal() {
    const modal = document.getElementById("videoModal")
    const iframe = document.getElementById("videoIframe")
  
    modal.classList.remove("show")
    iframe.src = ""
    document.body.style.overflow = "auto"
  }
  
  // Səhifə yüklənəndə
  document.addEventListener("DOMContentLoaded", () => {
    // data-bg-image işləmək
    const videoBanner = document.querySelector(".video-banner")
    const bgImage = videoBanner.getAttribute("data-bg-image")
    if (bgImage) {
      videoBanner.style.backgroundImage = `url('${bgImage}')`
    }
  
    // Video popup link-ə klik
    const videoPopup = document.querySelector(".video-popup")
    if (videoPopup) {
      videoPopup.addEventListener("click", function (e) {
        e.preventDefault()
        const videoUrl = this.getAttribute("href")
        openVideoModal(videoUrl)
      })
    }
  
    // Modal bağlama düymələri
    const closeBtn = document.querySelector(".video-modal-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", closeVideoModal)
    }
  
    // Modal arxa planına klik
    const modal = document.getElementById("videoModal")
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          closeVideoModal()
        }
      })
    }
  
    // ESC düyməsi
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeVideoModal()
      }
    })
  })



  class InstagramSlider {
    constructor(sliderId) {
      this.slider = document.getElementById(sliderId)
      this.prevBtn = document.getElementById("prevBtn")
      this.nextBtn = document.getElementById("nextBtn")
      this.currentIndex = 0
      this.itemsToShow = this.getItemsToShow()
      this.totalItems = this.slider.children.length
      this.isTransitioning = false
      this.eventsBound = false
  
      if (!this.slider) {
        console.error("Slider element not found!")
        return
      }
  
      this.init()
      this.bindEvents()
    }
  
    init() {
      this.cloneItems()
      this.updateSlider()
    }
  
    cloneItems() {
      // Clear any existing clones first
      const originalItems = Array.from(this.slider.children).slice(0, this.totalItems)
      this.slider.innerHTML = ""
  
      // Add original items back
      originalItems.forEach((item) => this.slider.appendChild(item))
  
      // Clone first few items and append to end
      for (let i = 0; i < this.itemsToShow; i++) {
        const clone = originalItems[i].cloneNode(true)
        this.slider.appendChild(clone)
      }
  
      // Clone last few items and prepend to beginning
      for (let i = this.totalItems - this.itemsToShow; i < this.totalItems; i++) {
        const clone = originalItems[i].cloneNode(true)
        this.slider.insertBefore(clone, this.slider.firstChild)
      }
  
      // Update current index to account for prepended items
      this.currentIndex = this.itemsToShow
      this.slider.style.transition = "transform 0.5s ease"
      this.slider.style.transform = `translateX(-${this.currentIndex * (100 / this.itemsToShow)}%)`
    }
  
    getItemsToShow() {
      const width = window.innerWidth
      if (width <= 479) return 1
      if (width <= 767) return 2
      if (width <= 991) return 3
      if (width <= 1199) return 4
      return 5
    }
  
    updateSlider() {
      const itemWidth = 100 / this.itemsToShow
      const translateX = -(this.currentIndex * itemWidth)
      this.slider.style.transform = `translateX(${translateX}%)`
    }
  
    next() {
      if (this.isTransitioning) return
  
      this.isTransitioning = true
      this.currentIndex++
      this.updateSlider()
  
      setTimeout(() => {
        if (this.currentIndex >= this.totalItems + this.itemsToShow) {
          this.slider.style.transition = "none"
          this.currentIndex = this.itemsToShow
          this.updateSlider()
  
          setTimeout(() => {
            this.slider.style.transition = "transform 0.5s ease"
            this.isTransitioning = false
          }, 50)
        } else {
          this.isTransitioning = false
        }
      }, 500)
    }
  
    prev() {
      if (this.isTransitioning) return
  
      this.isTransitioning = true
      this.currentIndex--
      this.updateSlider()
  
      setTimeout(() => {
        if (this.currentIndex < this.itemsToShow) {
          this.slider.style.transition = "none"
          this.currentIndex = this.totalItems
          this.updateSlider()
  
          setTimeout(() => {
            this.slider.style.transition = "transform 0.5s ease"
            this.isTransitioning = false
          }, 50)
        } else {
          this.isTransitioning = false
        }
      }, 500)
    }
  
    bindEvents() {
      if (this.eventsBound) return
      this.eventsBound = true
  
      // Remove any existing event listeners
      if (this.nextBtn) {
        this.nextBtn.replaceWith(this.nextBtn.cloneNode(true))
        this.nextBtn = document.getElementById("nextBtn")
      }
  
      if (this.prevBtn) {
        this.prevBtn.replaceWith(this.prevBtn.cloneNode(true))
        this.prevBtn = document.getElementById("prevBtn")
      }
  
      // Add single event listeners
      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.next()
        })
      }
  
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.prev()
        })
      }
  
      // Handle window resize
      let resizeTimeout
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          const newItemsToShow = this.getItemsToShow()
          if (newItemsToShow !== this.itemsToShow) {
            this.itemsToShow = newItemsToShow
            this.init()
          }
        }, 250)
      })
  
      // Touch/swipe support
      let startX = 0
      let startY = 0
      let endX = 0
      let endY = 0
  
      this.slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      })
  
      this.slider.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX
        endY = e.changedTouches[0].clientY
        const diffX = startX - endX
        const diffY = startY - endY
  
        // Only trigger if horizontal swipe is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.next()
          } else {
            this.prev()
          }
        }
      })
    }
  }
  
  // Global slider instance
  let sliderInstance = null
  
  // Initialize the slider when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Wait for all elements to be ready
    setTimeout(() => {
      sliderInstance = new InstagramSlider("instafeed-slider")
    }, 200)
  })
  