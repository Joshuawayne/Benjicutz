<template>
  <div class="my-12 bg-parlour-card rounded-sm p-6 md:p-10 border border-parlour-dark/20">
    <div class="max-w-2xl mx-auto text-center mb-8 space-y-3">
      <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">MACRO PRECISION COMPARISON</span>
      <h2 class="text-3xl sm:text-4xl font-serif font-black uppercase text-parlour-dark">
        {{ currentMode.title }}
      </h2>
      <p class="text-xs sm:text-sm text-parlour-dark/70 font-serif leading-relaxed">
        {{ currentMode.description }}
      </p>

      <!-- Preset Switcher -->
      <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          v-for="mode in modes"
          :key="mode.id"
          type="button"
          @click="switchMode(mode.id)"
          :class="[
            'px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border relative overflow-hidden',
            selectedModeId === mode.id
              ? 'bg-parlour-dark text-parlour-cream border-parlour-dark shadow-md'
              : 'bg-parlour-cream/80 text-parlour-dark border-parlour-dark/20 hover:border-parlour-dark'
          ]"
        >
          {{ mode.tabName }}
        </button>
      </div>
    </div>

    <!-- Interactive Comparison Container -->
    <div
      ref="containerRef"
      class="relative max-w-3xl mx-auto h-[380px] sm:h-[460px] md:h-[500px] overflow-hidden shadow-2xl border-2 border-parlour-dark select-none cursor-ew-resize bg-parlour-dark touch-none group"
      @pointerdown="startDrag"
      @pointermove="onPointerMove"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
      @pointerleave="onContainerLeave"
    >
      <!-- "AFTER" View (Full Background) -->
      <div class="absolute inset-0 select-none">
        <img
          :src="currentMode.afterImage"
          :alt="currentMode.afterLabel"
          class="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
          :style="{ transform: isDragging ? 'scale(1.015)' : 'scale(1)' }"
        />
        <div
          class="absolute top-4 right-4 bg-parlour-dark/95 backdrop-blur-sm text-parlour-cream px-3 py-1.5 font-serif text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border border-parlour-gold/40 shadow-lg transition-opacity duration-300 pointer-events-none"
          :style="{ opacity: sliderPosition < 85 ? 1 : 0.2 }"
        >
          {{ currentMode.afterLabel }}
        </div>
      </div>

      <!-- "BEFORE" View (Clipped with Smooth Clip-Path) -->
      <div
        class="absolute inset-0 overflow-hidden select-none"
        :style="{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }"
      >
        <img
          :src="currentMode.beforeImage"
          :alt="currentMode.beforeLabel"
          class="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
          :style="{ transform: isDragging ? 'scale(1.015)' : 'scale(1)' }"
        />
        <div
          class="absolute top-4 left-4 bg-parlour-cream/95 backdrop-blur-sm text-parlour-dark px-3 py-1.5 font-serif text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border border-parlour-dark shadow-lg transition-opacity duration-300 pointer-events-none"
          :style="{ opacity: sliderPosition > 15 ? 1 : 0.2 }"
        >
          {{ currentMode.beforeLabel }}
        </div>
      </div>

      <!-- Divider Bar & Magnetized Handle -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-parlour-cream shadow-2xl z-20 pointer-events-none will-change-transform"
        :style="{ left: `${sliderPosition}%` }"
      >
        <!-- Subtle Glow Line Accent -->
        <div class="absolute inset-0 bg-parlour-gold/70 blur-[1px] opacity-80"></div>

        <!-- Magnetized Handle Node -->
        <div
          ref="handleRef"
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-parlour-dark text-parlour-cream rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-parlour-cream transition-transform duration-200 ease-out"
          :class="{
            'scale-110 ring-4 ring-parlour-gold/40 border-parlour-gold': isDragging,
            'scale-105': isHoveringHandle && !isDragging
          }"
          :style="{
            transform: `translate(-50%, -50%) translate(${magneticOffset.x}px, ${magneticOffset.y}px)`
          }"
        >
          <!-- Dual Chevron Indicator -->
          <svg class="w-4 h-4 text-parlour-cream transition-transform duration-300" :class="{ 'scale-110 text-parlour-gold': isDragging }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="8 7 3 12 8 17"></polyline>
            <polyline points="16 7 21 12 16 17"></polyline>
          </svg>
        </div>
      </div>

      <!-- Bottom Interactive Status Badge -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-parlour-dark/90 backdrop-blur-md rounded-full text-[9px] font-mono tracking-widest uppercase text-parlour-cream pointer-events-none border border-parlour-cream/20 flex items-center gap-2 shadow-lg">
        <span class="w-1.5 h-1.5 rounded-full" :class="isDragging ? 'bg-parlour-gold animate-ping' : 'bg-parlour-gold/80'"></span>
        <span>{{ isDragging ? `PRECISION INSPECTION • ${Math.round(sliderPosition)}%` : 'DRAG TO COMPARE' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

interface ComparisonMode {
  id: string;
  tabName: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const modes: ComparisonMode[] = [
  {
    id: "hairline",
    tabName: "Airbladed Hairline",
    title: "Micro-Airblading Hairline Symmetry",
    description: "Compare natural irregular growth vs surgical organic mineral airblading with razor-sharp temple lines.",
    beforeImage: "/images/session.jpg",
    afterImage: "/images/hairline.jpg",
    beforeLabel: "BEFORE • NATURAL STATE",
    afterLabel: "AFTER • MICRO-AIRBLADED"
  },
  {
    id: "taper",
    tabName: "Taper Fade Gradient",
    title: "Surgical Steel Taper Gradient",
    description: "Inspect close-up texture blending and seamless skin gradient transition under Japanese Hitachi shears.",
    beforeImage: "/images/about2.webp",
    afterImage: "/images/model.webp",
    beforeLabel: "BEFORE • OVERGROWN WEIGHT",
    afterLabel: "AFTER • HITACHI TAPER FADE"
  },
  {
    id: "beard",
    tabName: "Beard Sculpture & Steam",
    title: "Botanical Beard Sculpting",
    description: "Observe unshaped dry facial hair transformed into structured, hot-towel nourished perfection.",
    beforeImage: "/images/about.webp",
    afterImage: "/images/model1.webp",
    beforeLabel: "BEFORE • UNMANAGED BEARD",
    afterLabel: "AFTER • SCULPTED & NOURISHED"
  }
];

const selectedModeId = ref("hairline");
const sliderPosition = ref(50);
const targetPosition = ref(50);
const isDragging = ref(false);
const isHoveringHandle = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);

// Magnetic handle hover coordinates
const magneticOffset = ref({ x: 0, y: 0 });

let animationFrameId: number | null = null;

const currentMode = computed(() => {
  return modes.find((m) => m.id === selectedModeId.value) || modes[0];
});

// Physics dampening loop (Lerp with dampening factor)
const updatePhysics = () => {
  const dampening = isDragging.value ? 0.16 : 0.08;
  const delta = targetPosition.value - sliderPosition.value;

  if (Math.abs(delta) > 0.01) {
    sliderPosition.value += delta * dampening;
  } else {
    sliderPosition.value = targetPosition.value;
  }

  animationFrameId = requestAnimationFrame(updatePhysics);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(updatePhysics);
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
});

// Smooth mode switcher with GSAP tween
const switchMode = (modeId: string) => {
  selectedModeId.value = modeId;
  gsap.to(targetPosition, {
    value: 50,
    duration: 0.8,
    ease: "power3.out",
  });
};

const startDrag = (event: PointerEvent) => {
  isDragging.value = true;
  if (containerRef.value) {
    containerRef.value.setPointerCapture(event.pointerId);
  }
  updateTargetFromPointer(event);
};

const stopDrag = (event: PointerEvent) => {
  isDragging.value = false;
  if (containerRef.value && containerRef.value.hasPointerCapture(event.pointerId)) {
    containerRef.value.releasePointerCapture(event.pointerId);
  }
  magneticOffset.value = { x: 0, y: 0 };
};

const onContainerLeave = () => {
  if (!isDragging.value) {
    isHoveringHandle.value = false;
    magneticOffset.value = { x: 0, y: 0 };
  }
};

const onPointerMove = (event: PointerEvent) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();

  if (isDragging.value) {
    updateTargetFromPointer(event);
    return;
  }

  // Calculate magnetic proximity to the center divider handle
  const handleX = rect.left + (sliderPosition.value / 100) * rect.width;
  const handleY = rect.top + rect.height / 2;
  const distX = event.clientX - handleX;
  const distY = event.clientY - handleY;
  const distance = Math.hypot(distX, distY);

  if (distance < 70) {
    isHoveringHandle.value = true;
    // Gentle magnetic pull toward pointer
    magneticOffset.value = {
      x: distX * 0.22,
      y: distY * 0.22,
    };
  } else {
    isHoveringHandle.value = false;
    magneticOffset.value = { x: 0, y: 0 };
  }
};

const updateTargetFromPointer = (event: PointerEvent) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  let percentage = (offsetX / rect.width) * 100;

  // Magnetic detent snapping around 50% (center threshold)
  if (Math.abs(percentage - 50) < 2.5) {
    percentage = 50;
  }

  targetPosition.value = Math.max(4, Math.min(96, percentage));
};
</script>

