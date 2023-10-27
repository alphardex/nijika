<script lang="ts" setup>
import { ref } from "vue";

import gsap from "gsap";

export interface Props {
  zIndex?: number;
  maskColor?: string;
}

const emit = defineEmits([
  "open-start",
  "open-end",
  "close-start",
  "close-end",
]);

withDefaults(defineProps<Props>(), {
  zIndex: 5,
  maskColor: "black",
});

const isAnimating = ref(false);

const overlay = ref<HTMLElement | null>(null);
const overlayPath = ref<HTMLElement | null>(null);

const open = () => {
  if (isAnimating.value) {
    return;
  }

  isAnimating.value = true;
  const t1 = gsap.timeline({
    onStart: () => {
      if (overlay.value) {
        overlay.value.style.pointerEvents = "auto";
      }
      emit("open-start");
    },
    onComplete: () => {
      isAnimating.value = false;
    },
  });
  t1.set(overlayPath.value, {
    attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
  })
    .to(
      overlayPath.value,
      {
        duration: 0.8,
        ease: "power4.in",
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
      },
      0
    )
    .to(overlayPath.value, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      onComplete: () => {
        emit("open-end");
      },
    });
};

const close = () => {
  if (isAnimating.value) {
    return;
  }

  isAnimating.value = true;
  const t1 = gsap.timeline({
    onStart: () => {
      if (overlay.value) {
        overlay.value.style.pointerEvents = "none";
      }
      emit("close-start");
    },
    onComplete: () => {
      isAnimating.value = false;
    },
  });
  t1.set(overlayPath.value, {
    attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
  })
    .to(overlayPath.value, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
    })
    .to(overlayPath.value, {
      duration: 0.8,
      ease: "power4",
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      onComplete: () => {
        emit("close-end");
      },
    });
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <svg
    class="curve-mask"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    :fill="maskColor"
    ref="overlay"
  >
    <path
      class="curve-mask__path"
      vector-effect="non-scaling-stroke"
      d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
      ref="overlayPath"
    />
  </svg>
</template>

<style lang="scss">
.curve-mask {
  position: absolute;
  z-index: v-bind(zIndex);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
