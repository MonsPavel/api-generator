<script setup>
import { generateApiClasses } from './helpers/class-generator'
import { fromCapitalLetter } from './helpers/helpers'

import { axios } from './api-files/axios'
import { BaseApi } from './api-files/BaseApi'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const uploadedFile = ref(null)
const apiFile = ref(null)

const filePaths = computed(() => uploadedFile.value?.paths || null)

const setFile = () => {
  let file = apiFile.value.files[0];
  if(!file || file.type !== 'application/json') return

  let reader = new FileReader();
  reader.readAsText(file, "UTF-8")

  reader.onload = event => {
    let text = event.target.result
    try {
      uploadedFile.value = JSON.parse(text)
    } catch(e) {
      alert("Sorry, your file doesn't appear to be valid JSON data.");
    }
  }

  reader.onerror = event => {
    console.error(event)
  }
}

const saveFiles = async () => {
  const { classes, classNames } = generateApiClasses(filePaths.value)
  const zip = new JSZip()
  zip.file('axios.js', axios)
  zip.file('BaseApi.js', BaseApi)
  for(let i = 0, len = classes.length; i < len; i += 1) {
    zip.file(`${fromCapitalLetter(classNames[i])}.js`, classes[i])
  }
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'api.zip')
  })
  uploadedFile.value = null
}
</script>

<template>
  <div>
    <input type="file" @change="setFile" ref="apiFile">
<!--    <div v-for="item in classes">-->
<!--      <pre>{{ item }}</pre>-->
<!--    </div>-->
    <button @click="saveFiles()" :disabled="!filePaths">Скачать</button>
  </div>
</template>

<style scoped>

</style>
