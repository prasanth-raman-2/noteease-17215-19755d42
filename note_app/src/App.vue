<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
</script>

<template>
  <main>
    <MainContainer />
  </main>
</template>

<style>
:root {
  --color-primary: #4A90E2;
  --color-secondary: #F5F7FA;
  --color-accent: #FFD700;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-border: #E1E1E1;
  --color-background: white;
  --color-background-soft: #F5F7FA;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--color-text);
  background-color: var(--color-background);
}

main {
  height: 100vh;
}

input, textarea, select, button {
  font-family: inherit;
}

button {
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button:active {
  opacity: 0.8;
}
</style>
