<script setup>
import { generateApiClasses } from './helpers/class-generator'
import { fromCapitalLetter } from './helpers/helpers'

import { axios } from './api-files/axios'
import { BaseApi } from './api-files/BaseApi'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const { classes, classNames } = generateApiClasses()

const saveFiles = async () => {
  const zip = new JSZip()
  zip.file('axios.js', axios)
  zip.file('BaseApi.js', BaseApi)
  for(let i = 0, len = classes.length; i < len; i += 1) {
    zip.file(`${fromCapitalLetter(classNames[i])}.js`, classes[i])
  }
  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'api.zip')
  })
}
</script>

<template>
  <div>
    <div v-for="item in classes">
      <pre>{{ item }}</pre>
    </div>
    <button @click="saveFiles()">Скачать</button>
  </div>
</template>

<style scoped>

</style>
