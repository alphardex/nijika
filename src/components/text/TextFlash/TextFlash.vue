<script lang="ts" setup>
// ref: https://codepen.io/alphardex/pen/WNQPWmj

export interface Props {
  lineColor?: string;
  lineHeight?: string;
  hoverTextColor?: string;
}

withDefaults(defineProps<Props>(), {
  lineColor: "white",
  lineHeight: "1px",
  hoverTextColor: "currentColor",
});
</script>

<template>
  <div class="text-flash">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.text-flash {
  --text-flash-line-color: v-bind(lineColor);
  --text-flash-line-height: v-bind(lineHeight);
  --text-flash-line-offset: 0.6px;
  --text-flash-easing: cubic-bezier(0.19, 1, 0.22, 1);
  --text-flash-hover-text-color: v-bind(hoverTextColor);

  position: relative;
  display: inline-flex;
  transition: 0.5s;

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 0;
    bottom: calc(
      (var(--text-flash-line-height) + var(--text-flash-line-offset)) * -1
    );
    display: block;
    width: 100%;
    height: var(--text-flash-line-height);
    background: var(--text-flash-line-color);
    transition: 1.1s var(--text-flash-easing);
  }

  // 默认情况下，前条收缩，后条伸展
  // 悬浮时，后条先缩回右边，前条再伸出来
  // 松开时，前条先缩回左边，后条再伸出来

  &::before {
    transform: scaleX(0);
    transform-origin: left;
  }

  &::after {
    transform-origin: right;
    transition-delay: 0.25s;
  }

  &:hover {
    color: var(--text-flash-hover-text-color);

    &::before {
      transform: scaleX(1);
      transition-delay: 0.25s;
    }

    &::after {
      transform: scaleX(0);
      transition-delay: 0s;
    }
  }
}
</style>
