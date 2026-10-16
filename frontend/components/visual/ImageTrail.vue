<template>
  <div
    ref="trailContainer"
    class="image-trail-zone"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
  >
    <!-- Subtle trail images rendered behind the text content -->
    <div class="trail-canvas-layer">
      <div
        v-for="img in activeImages"
        :key="img.id"
        class="trail-image"
        :style="{
          left: img.x + 'px',
          top: img.y + 'px',
          opacity: img.opacity,
          transform: `translate(-50%, -50%) scale(${img.scale}) rotate(${img.rotation}deg)`,
          width: imageWidth + 'px',
          height: imageHeight + 'px',
          zIndex: 1 + (img.id % 8),
        }"
      >
        <img
          :src="img.src"
          :alt="'Lookbook image ' + img.index"
          class="trail-img-inner"
          draggable="false"
        />
      </div>
    </div>
    <!-- Slot content (typography headline) layered on top -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

interface Props {
  /** Array of image URLs to cycle through */
  images: string[]
  /** Width of each trail image in px */
  imageWidth?: number
  /** Height of each trail image in px */
  imageHeight?: number
  /** Min distance (px) the mouse must travel before spawning a new image */
  threshold?: number
  /** How long each image lives (ms) */
  lifespan?: number
  /** Max number of visible trail images */
  maxImages?: number
  /** Rotation range (degrees) per image */
  rotationRange?: number
  /** Peak opacity for subtle elegance (0 to 1) */
  maxOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  imageWidth: 105,
  imageHeight: 135,
  threshold: 42,
  lifespan: 1050,
  maxImages: 6,
  rotationRange: 7,
  maxOpacity: 0.65,
})

interface TrailImage {
  id: number
  x: number
  y: number
  opacity: number
  scale: number
  rotation: number
  src: string
  index: number
  birthTime: number
}

const trailContainer = ref<HTMLElement | null>(null)
const activeImages = reactive<TrailImage[]>([])
let imageIndex = 0
let idCounter = 0
let lastX = 0
let lastY = 0
const isActive = ref(false)
let rafId: number | null = null

// Velocity tracking
let prevMouseX = 0
let prevMouseY = 0
let mouseVelocity = 0

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function spawnImage(clientX: number, clientY: number) {
  if (!trailContainer.value || !props.images.length) return
  const rect = trailContainer.value.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top

  // Strictly only spawn when cursor is within this typography zone
  if (x < 0 || x > rect.width || y < 0 || y > rect.height) return

  const rotation = (Math.random() - 0.5) * props.rotationRange * 2
  const src = props.images[imageIndex % props.images.length]
  imageIndex++

  const img: TrailImage = {
    id: idCounter++,
    x,
    y,
    opacity: 0,
    scale: 0.65,
    rotation,
    src,
    index: imageIndex,
    birthTime: performance.now(),
  }

  activeImages.push(img)

  while (activeImages.length > props.maxImages) {
    activeImages.shift()
  }
}

function onMouseMove(e: MouseEvent) {
  if (!isActive.value) {
    isActive.value = true
    lastX = e.clientX
    lastY = e.clientY
    prevMouseX = e.clientX
    prevMouseY = e.clientY
    spawnImage(e.clientX, e.clientY)
    return
  }

  const dx = e.clientX - prevMouseX
  const dy = e.clientY - prevMouseY
  mouseVelocity = Math.sqrt(dx * dx + dy * dy)
  prevMouseX = e.clientX
  prevMouseY = e.clientY

  const dist = getDistance(e.clientX, e.clientY, lastX, lastY)
  const dynamicThreshold = Math.max(props.threshold * 0.45, props.threshold - mouseVelocity * 0.6)

  if (dist >= dynamicThreshold) {
    spawnImage(e.clientX, e.clientY)
    lastX = e.clientX
    lastY = e.clientY
  }
}

function onMouseEnter(e: MouseEvent) {
  isActive.value = true
  lastX = e.clientX
  lastY = e.clientY
  prevMouseX = e.clientX
  prevMouseY = e.clientY
}

function onMouseLeave() {
  isActive.value = false
}

// Touch support for mobile devices
function onTouchStart(e: TouchEvent) {
  if (!e.touches.length) return
  isActive.value = true
  const t = e.touches[0]
  lastX = t.clientX
  lastY = t.clientY
  prevMouseX = t.clientX
  prevMouseY = t.clientY
  spawnImage(t.clientX, t.clientY)
}

function onTouchMove(e: TouchEvent) {
  if (!e.touches.length) return
  const t = e.touches[0]
  if (!isActive.value) {
    onTouchStart(e)
    return
  }
  const dist = getDistance(t.clientX, t.clientY, lastX, lastY)
  if (dist >= props.threshold * 0.8) {
    spawnImage(t.clientX, t.clientY)
    lastX = t.clientX
    lastY = t.clientY
  }
}

function onTouchEnd() {
  isActive.value = false
}

function animate() {
  const now = performance.now()

  for (let i = activeImages.length - 1; i >= 0; i--) {
    const img = activeImages[i]
    const elapsed = now - img.birthTime
    const progress = elapsed / props.lifespan

    if (progress >= 1) {
      activeImages.splice(i, 1)
      continue
    }

    const fadeInEnd = 0.18
    const fadeOutStart = 0.45
    const peak = props.maxOpacity

    if (progress < fadeInEnd) {
      const t = progress / fadeInEnd
      const eased = 1 - Math.pow(1 - t, 3)
      img.opacity = eased * peak
      img.scale = 0.65 + eased * 0.25 // scale up gently to 0.90
    } else if (progress > fadeOutStart) {
      const t = (progress - fadeOutStart) / (1 - fadeOutStart)
      const eased = t * t
      img.opacity = peak * (1 - eased)
      img.scale = 0.90 - eased * 0.08
    } else {
      img.opacity = peak
      img.scale = 0.90
    }

    img.y += 0.15
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.image-trail-zone {
  position: relative;
  display: block;
  user-select: none;
}

@media (hover: hover) and (pointer: fine) {
  .image-trail-zone {
    cursor: default;
  }
}

.trail-canvas-layer {
  position: absolute;
  inset: -30px;
  pointer-events: none;
  overflow: visible;
  z-index: 5;
}

.trail-image {
  position: absolute;
  pointer-events: none;
  will-change: transform, opacity;
  border-radius: 3px;
  overflow: hidden;
  box-shadow:
    0 8px 24px rgba(20, 18, 16, 0.16),
    0 2px 8px rgba(20, 18, 16, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.3);
  background-color: #141210;
}

.trail-img-inner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}
</style>
