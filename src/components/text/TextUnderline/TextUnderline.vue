<script lang="ts" setup>
// ref: https://codepen.io/alphardex/pen/MWWEmLK

export interface Props {
  lineColor?: string;
  lineHeight?: string;
  hoverTextColor?: string;
}

withDefaults(defineProps<Props>(), {
  lineColor: "white",
  lineHeight: "3px",
  hoverTextColor: "currentColor",
});
</script>

<template>
  <div class="text-underline">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.text-underline {
  --text-underline-line-color: v-bind(lineColor);
  --text-underline-line-height: v-bind(lineHeight);
  --text-underline-hover-text-color: v-bind(hoverTextColor);

  position: relative;
  display: inline-flex;
  transition: 0.5s;

  &::after {
    position: absolute;
    content: "";
    top: 100%;
    left: 0;
    width: 100%;
    height: var(--text-underline-line-height);
    background: var(--text-underline-line-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s;
  }

  &:hover {
    color: var(--text-underline-hover-text-color);

    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
}
</style>
