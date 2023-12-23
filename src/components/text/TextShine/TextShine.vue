<script lang="ts" setup>
// ref: https://www.14islands.com/

import { ref, onMounted } from "vue";

export interface Props {
  text: string;
  textColor?: string;
  textSize?: string;
  textWeight?: string;
  textFont?: string;
  textLeading?: string;
  textStyle?: string;
  textWhiteSpace?: string;
  stagger?: number;
  ease?: string;
}

const props = withDefaults(defineProps<Props>(), {
  textColor: "white",
  textSize: "1rem",
  textWeight: "normal",
  textFont: "",
  textLeading: "normal",
  textStyle: "normal",
  textWhiteSpace: "normal",
  stagger: 0.04,
  ease: "ease-in-out",
});

const parent = ref<HTMLElement | null>(null);

onMounted(() => {
  const text = props.text;
  if (parent.value && text) {
    let letters = text.split("");
    parent.value.textContent = "";
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.setProperty("--i", `${i}`);
      parent.value?.append(span);
    });
  }
});
</script>

<template>
  <div class="text-shine" ref="parent"></div>
</template>

<style lang="scss">
.text-shine {
  --text-shine-color: v-bind(textColor);
  --text-shine-size: v-bind(textSize);
  --text-shine-weight: v-bind(textWeight);
  --text-shine-font: v-bind(textFont);
  --text-shine-leading: v-bind(textLeading);
  --text-shine-style: v-bind(textStyle);
  --text-shine-white-space: v-bind(textWhiteSpace);
  --text-shine-stagger: v-bind(stagger);
  --text-shine-ease: v-bind(ease);

  display: flex;

  span {
    color: var(--text-shine-color);
    font-size: var(--text-shine-size);
    font-weight: var(--text-shine-weight);
    font-family: var(--text-shine-font);
    line-height: var(--text-shine-leading);
    font-style: var(--text-shine-style);
    white-space: var(--text-shine-white-space);
  }

  &:hover {
    span {
      animation: text-shine 0.4s var(--text-shine-ease);
      animation-delay: calc(var(--i) * var(--text-shine-stagger) * 1s);
    }
  }
}

@keyframes text-shine {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}
</style>
