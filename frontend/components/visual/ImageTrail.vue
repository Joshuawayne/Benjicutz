<template>
  <div
    ref="trailContainer"
    class="image-trail-zone"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
    <!-- Trail images rendered as absolutely-positioned fading ghosts -->
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
        zIndex: img.z,
      }"
    >
      <img
        :src="img.src"
        :alt="'Trail image ' + img.index"
        class="trail-img-inner"
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'

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
  /** Enable/disable lerp follow for trail images */
  lerpFollow?: boolean
  /** Lerp speed (0-1, lower = more lag) */
  lerpSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  imageWidth: 160,
  imageHeight: 200,
  threshold: 80,
  lifespan: 1200,
  maxImages: 8,
  rotationRange: 12,
  lerpFollow: true,
  lerpSpeed: 0.12,
})

interface TrailImage {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  opacity: number
  scale: number
  rotation: number
  src: string
  index: number
  z: number
  birthTime: number
}

const trailContainer = ref<HTMLElement | null>(null)
const activeImages = reactive<TrailImage[]>([])
let imageIndex = 0
let idCounter = 0
let lastX = 0
let lastY = 0
let isActive = ref(false)
let rafId: number | null = null

// Velocity tracking
let prevMouseX = 0
let prevMouseY = 0
let mouseVelocity = 0

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function spawnImage(mouseX: number, mouseY: number) {
  if (!trailContainer.value) return
  const rect = trailContainer.value.getBoundingClientRect()
  const x = mouseX - rect.left
  const y = mouseY - rect.top

  const rotation = (Math.random() - 0.5) * props.rotationRange * 2
  const src = props.images[imageIndex % props.images.length]
  imageIndex++

  const img: TrailImage = {
    id: idCounter++,
    x,
    y,
    targetX: x,
    targetY: y,
    opacity: 0,
    scale: 0.6,
    rotation,
    src,
    index: imageIndex,
    z: idCounter,
    birthTime: performance.now(),
  }

  activeImages.push(img)

  // Enforce max images
  while (activeImages.length > props.maxImages) {
    activeImages.shift()
  }
}

function onMouseMove(e: MouseEvent) {
  if (!isActive.value) return

  // Track velocity
  const dx = e.clientX - prevMouseX
  const dy = e.clientY - prevMouseY
  mouseVelocity = Math.sqrt(dx * dx + dy * dy)
  prevMouseX = e.clientX
  prevMouseY = e.clientY

  // Only spawn if moved past threshold distance
  const dist = getDistance(e.clientX, e.clientY, lastX, lastY)
  // Dynamic threshold: faster movement = more frequent spawns
  const dynamicThreshold = Math.max(props.threshold * 0.5, props.threshold - mouseVelocity * 1.5)

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

function animate() {
  const now = performance.now()

  for (let i = activeImages.length - 1; i >= 0; i--) {
    const img = activeImages[i]
    const elapsed = now - img.birthTime
    const progress = elapsed / props.lifespan

    if (progress >= 1) {
      // Remove expired images
      activeImages.splice(i, 1)
      continue
    }

    // Eased lifecycle phases
    const fadeInEnd = 0.15
    const fadeOutStart = 0.45

    if (progress < fadeInEnd) {
      // Quick fade-in + scale-up
      const t = progress / fadeInEnd
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      img.opacity = eased * 0.85
      img.scale = 0.6 + eased * 0.45
    } else if (progress > fadeOutStart) {
      // Slow fade-out
      const t = (progress - fadeOutStart) / (1 - fadeOutStart)
      const eased = 1 - Math.pow(1 - t, 2) // ease-in quad
      img.opacity = 0.85 * (1 - eased)
      img.scale = 1.05 - eased * 0.15
    } else {
      // Sustain
      img.opacity = 0.85
      img.scale = 1.05
    }

    // Subtle gravity drift during life
    img.y += 0.15

    // Slight rotation drift
    img.rotation += (Math.random() - 0.5) * 0.08
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
  overflow: visible;
  touch-action: pan-y;
}

@media (hover: hover) and (pointer: fine) {
  .image-trail-zone {
    cursor: crosshair;
    overflow: hidden;
  }
}

.trail-image {
  position: absolute;
  pointer-events: none;
  will-change: transform, opacity;
  transition: none;
  border-radius: 2px;
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(20, 18, 16, 0.18),
    0 2px 8px rgba(20, 18, 16, 0.10);
  border: 1.5px solid rgba(20, 18, 16, 0.12);
}

.trail-img-inner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.05) saturate(0.9);
  user-select: none;
  -webkit-user-drag: none;
}
</style>
