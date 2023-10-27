<script setup lang="ts">
import { register } from "./components/";

import { onMounted } from "vue";

register();

const openCurveMask = () => {
  const curveMask = document.querySelector("curve-mask") as any;
  const exposed = curveMask?._instance?.exposed as any;
  if (exposed) {
    exposed.open();
  }
};

const closeCurveMask = () => {
  const curveMask = document.querySelector("curve-mask") as any;
  const exposed = curveMask?._instance?.exposed as any;
  if (exposed) {
    document.querySelector(".another-scene")?.classList.add("hollow");
    exposed.close();
  }
};

const onCurveMaskOpen = () => {
  const curveMask = document.querySelector("curve-mask") as any;
  curveMask.addEventListener("open-end", () => {
    document.querySelector(".another-scene")?.classList.remove("hollow");
  });
};

onMounted(() => {
  onCurveMaskOpen();
});
</script>

<template>
  <div>
    <div class="p-4">
      <div class="flex flex-col space-y-8 items-start">
        <div class="space-y-4">
          <h3 class="text-primary">Text Flash</h3>
          <div>
            <div class="flex space-x-4">
              <text-flash>Default Line</text-flash>
              <text-flash line-color="var(--primary-color)">
                Yellow Line
              </text-flash>
              <text-flash line-color="var(--success-color)">
                Pink Line
              </text-flash>
              <text-flash line-height="4px">Thick Line</text-flash>
              <text-flash hover-text-color="#bbbbbb">Hover Color</text-flash>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-primary">Text Underline</h3>
          <div>
            <div class="flex space-x-4">
              <text-underline>Default Line</text-underline>
              <text-underline line-color="var(--primary-color)">
                Yellow Line
              </text-underline>
              <text-underline line-color="var(--success-color)">
                Pink Line
              </text-underline>
              <text-underline line-height="8px">Thick Line</text-underline>
              <text-underline hover-text-color="#bbbbbb">
                Hover Color
              </text-underline>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-primary">Text Float</h3>
          <div>
            <div class="flex space-x-4">
              <text-float text="CoolEffect" stagger="0"></text-float>
              <text-float text="Blingbling" stagger="1"></text-float>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-primary">Text Blink</h3>
          <div>
            <div class="flex space-x-4">
              <text-blink text="CoolEffect"></text-blink>
              <text-blink text="Blingbling"></text-blink>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-primary">Magnet Mouse</h3>
          <div>
            <magnet-mouse threshold="120">
              <div class="text-4xl">Hover Me</div>
            </magnet-mouse>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-primary">Curve Mask</h3>
          <div>
            <button class="btn btn-primary btn-ghost" @click="openCurveMask">
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
    <curve-mask mask-color="var(--info-color)"></curve-mask>
    <div
      class="another-scene fixed z-5 top-0 left-0 cover transition-opacity duration-500 hollow"
    >
      <div class="absolute hv-center">
        <button class="btn btn-primary btn-ghost" @click="closeCurveMask">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
