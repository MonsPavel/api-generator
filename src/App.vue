<script setup>
import {createFunctions} from "./helpers/functions-creator";

const api = createFunctions()
</script>

<template>
  <div>
    <pre>{{ api }}</pre>
  </div>
</template>

<style scoped>

</style>
