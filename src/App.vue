<script setup>
import { generateApiClasses } from './helpers/class-generator';
import { saveAs } from 'file-saver';

const api = generateApiClasses()


const saveFiles = () => {
  for(let i = 0, len = api.length; i < len; i += 1) {
    let blob = new Blob([api[i]], {type: "text/plain;charset=utf-8"})
    saveAs(blob, `api-${i}.js`)
  }
}
</script>

<template>
  <div>
    <div v-for="item in api">
      <pre>{{ item }}</pre>
    </div>
    <button @click="saveFiles()">Скачать</button>
  </div>
</template>

<style scoped>

</style>
