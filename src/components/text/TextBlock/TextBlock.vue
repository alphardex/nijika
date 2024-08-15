<script lang="ts" setup>
// ref: https://artemiilebedev.com/

export interface Props {
  blockColor?: string;
  hoverTextColor?: string;
  textPadding?: string;
  blockTransformOrigin?: string;
}

withDefaults(defineProps<Props>(), {
  blockColor: "#5e5e5e",
  hoverTextColor: "currentColor",
  textPadding: "0 2px",
  blockTransformOrigin: "bottom",
});
</script>

<template>
  <div class="text-block">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.text-block {
  --text-block-block-color: v-bind(blockColor);
  --text-block-easing: cubic-bezier(0.165, 0.84, 0.44, 1);
  --text-block-hover-text-color: v-bind(hoverTextColor);
  --text-block-text-padding: v-bind(textPadding);
  --text-block-block-transform-origin: v-bind(blockTransformOrigin);

  position: relative;
  display: inline-flex;
  padding: var(--text-block-text-padding);
  transition: 0.35s;

  &::before {
    position: absolute;
    content: "";
    z-index: -1;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--text-block-block-color);
    transition: 0.35s var(--text-block-easing);
  }

  &::before {
    transform: scaleY(0);
    transform-origin: var(--text-block-block-transform-origin);
  }

  &:hover {
    color: var(--text-block-hover-text-color);

    &::before {
      transform: scaleY(1);
    }
  }
}
</style>
