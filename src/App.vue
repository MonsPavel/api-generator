<script setup>
import {generateApiClasses} from "./helpers/class-generator";

const api = generateApiClasses()
</script>

<template>
  <div>
    <div v-for="item in api">
      <pre>{{ item }}</pre>
    </div>
  </div>
</template>

<style scoped>

</style>
