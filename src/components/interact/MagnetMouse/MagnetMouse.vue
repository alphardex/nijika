<script lang="ts" setup>
// ref: https://codepen.io/alphardex/details/NWxXGKb

import { useMouseInElement, useElementBounding } from "@vueuse/core";

import { ref, computed } from "vue";

export interface Props {
  threshold?: number;
  transitionDuration?: number;
  strength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 100,
  transitionDuration: 0.3,
  strength: 0.45,
});

const transitionDurationStyle = computed(() => `${props.transitionDuration}s`);

const target = ref<HTMLElement | null>(null);

const { x, y } = useMouseInElement(target);

const { left, top, width, height } = useElementBounding(target);

const centerX = computed(() => left.value + width.value / 2);
const centerY = computed(() => top.value + height.value / 2);

const deltaX = computed(() => centerX.value - x.value);
const deltaY = computed(() => centerY.value - y.value);

const distance = computed(() => Math.hypot(deltaX.value, deltaY.value));

const isInMagnetArea = computed(() => distance.value < props.threshold);

const h = computed(() => -props.strength * Math.floor(deltaX.value));

const v = computed(() => -props.strength * Math.floor(deltaY.value));
</script>

<template>
  <div
    class="magnet-mouse"
    ref="target"
    :style="{
      '--magnet-mouse-x': `${isInMagnetArea ? h : 0}px`,
      '--magnet-mouse-y': `${isInMagnetArea ? v : 0}px`,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.magnet-mouse {
  --magnet-mouse-x: 0;
  --magnet-mouse-y: 0;
  --magnet-mouse-transition-duration: v-bind(transitionDurationStyle);

  display: inline-flex;
  transform: translate(var(--magnet-mouse-x), var(--magnet-mouse-y));
  transition: var(--magnet-mouse-transition-duration);
}
</style>
