<template>
  <div class="result-page">
    <h2>Результаты заполнения формы</h2>
    <div class="result-item"><strong>Город:</strong> {{ formStore.cityName }}</div>
    <div class="result-item"><strong>Цех:</strong> {{ formStore.workshopName }}</div>
    <div class="result-item"><strong>Сотрудник:</strong> {{ formStore.employeeName }}</div>
    <div class="result-item"><strong>Бригада:</strong> {{ formStore.brigadeName }}</div>
    <div class="result-item"><strong>Смена:</strong> {{ formStore.shiftName }}</div>
    <button @click="router.push('/')">Вернуться к форме</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFormStore } from '@/entities/form/model/store'

const router = useRouter()
const formStore = useFormStore()
</script>

<style scoped>
.result-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.result-item {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
}
</style>
