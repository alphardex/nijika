<script lang="ts" setup>
// ref: https://codepen.io/alphardex/pen/BayEGXB

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
}

const props = withDefaults(defineProps<Props>(), {
  textColor: "white",
  textSize: "1rem",
  textWeight: "normal",
  textFont: "",
  textLeading: "normal",
  textStyle: "normal",
  textWhiteSpace: "normal",
});

const parent = ref<HTMLElement | null>(null);

onMounted(() => {
  const text = props.text;
  if (parent.value && text) {
    let letters = text.split("");
    parent.value.textContent = "";
    letters?.forEach((letter, i) => {
      i += 1;
      let span = document.createElement("span");
      let delay = i / 20;
      if (i % 2 === 0) {
        delay -= 0.1;
      } else {
        delay += 0.05;
      }
      let letterOut = document.createElement("span");
      letterOut.textContent = letter;
      letterOut.style.transitionDelay = `${delay}s`;
      letterOut.classList.add("out");
      span.append(letterOut);
      let letterIn = document.createElement("span");
      letterIn.textContent = letter;
      letterIn.style.transitionDelay = `${delay}s`;
      letterIn.classList.add("in");
      span.append(letterIn);
      parent.value?.append(span);
    });
  }
});
</script>

<template>
  <div class="text-blink" ref="parent"></div>
</template>

<style lang="scss">
.text-blink {
  --text-blink-color: v-bind(textColor);
  --text-blink-size: v-bind(textSize);
  --text-blink-weight: v-bind(textWeight);
  --text-blink-font: v-bind(textFont);
  --text-blink-leading: v-bind(textLeading);
  --text-blink-style: v-bind(textStyle);
  --text-blink-white-space: v-bind(textWhiteSpace);

  display: flex;

  span {
    position: relative;
    overflow: hidden;
    transition: 0.6s;
    color: var(--text-blink-color);
    font-size: var(--text-blink-size);
    font-weight: var(--text-blink-weight);
    font-family: var(--text-blink-font);
    line-height: var(--text-blink-leading);
    font-style: var(--text-blink-style);
    white-space: var(--text-blink-white-space);

    .out {
      display: inline-flex;
    }

    .in {
      position: absolute;
      left: 0;
      opacity: 0;
      transform: translateX(100%);
    }
  }

  &:hover {
    span {
      .out {
        opacity: 0;
        transform: translateX(-100%);
      }

      .in {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
