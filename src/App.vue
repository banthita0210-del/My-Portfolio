<script setup>
import MainMenu from "./components/MainMenu.vue"
</script>

<template>
  <MainMenu />

  <div class="page-wrapper">
    <router-view />
  </div>
</template>

<style>
/* ============================================
   Global Design System
============================================ */

:root {
  --gold: #c9a84c;
  --gold-dim: #a98b3a;

  --bg: #111118;
  --bg-light: #181820;

  --text: #e8e2d0;
  --text-dim: #aaa49a;

  --white: #ffffff;

  --serif: Georgia, "Times New Roman", serif;
  --mono: "Courier New", monospace;

  --shadow-sm: 0 2px 12px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 6px 24px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.35);

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;

  --transition: all 0.25s ease;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;

  font-family: Arial, sans-serif;

  background: var(--bg);

  color: var(--text);

  min-height: 100vh;
}

button {
  font-family: inherit;
}

.page-wrapper {
  min-height: 100vh;
  padding-top: 70px;
}
</style>