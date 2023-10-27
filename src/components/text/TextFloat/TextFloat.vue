<script lang="ts" setup>
// ref: https://codepen.io/alphardex/pen/wvBeXjd

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
}

const props = withDefaults(defineProps<Props>(), {
  textColor: "white",
  textSize: "1rem",
  textWeight: "normal",
  textFont: "",
  textLeading: "normal",
  textStyle: "normal",
  textWhiteSpace: "normal",
  stagger: 0,
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
      span.style.transitionDelay = `${(i / 20) * props.stagger}s`;
      span.dataset.text = letter;
      parent.value?.append(span);
    });
  }
});
</script>

<template>
  <div class="text-float" ref="parent"></div>
</template>

<style lang="scss">
.text-float {
  --text-float-color: v-bind(textColor);
  --text-float-size: v-bind(textSize);
  --text-float-weight: v-bind(textWeight);
  --text-float-font: v-bind(textFont);
  --text-float-leading: v-bind(textLeading);
  --text-float-style: v-bind(textStyle);
  --text-float-white-space: v-bind(textWhiteSpace);

  display: flex;
  overflow: hidden;

  span {
    position: relative;
    transition: 0.3s;
    color: var(--text-float-color);
    font-size: var(--text-float-size);
    font-weight: var(--text-float-weight);
    font-family: var(--text-float-font);
    line-height: var(--text-float-leading);
    font-style: var(--text-float-style);
    white-space: var(--text-float-white-space);

    &::before {
      position: absolute;
      content: attr(data-text);
      transform: translateY(130%);
    }
  }

  &:hover {
    span {
      transform: translateY(-130%);
    }
  }
}
</style>
