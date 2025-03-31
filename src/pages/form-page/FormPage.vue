<template>
  <div class="form-page">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Город:</label>
        <select v-model="formData.city" @change="onCityChange" :disabled="isLoading.cities">
          <option value="">Выберите город</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
        <span v-if="isLoading.cities">Загрузка...</span>
      </div>

      <div class="form-group">
        <label>Цех:</label>
        <select
          v-model="formData.workshop"
          @change="onWorkshopChange"
          :disabled="isLoading.workshops || !formData.city"
        >
          <option value="">Выберите цех</option>
          <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">
            {{ workshop.name }}
          </option>
        </select>
        <span v-if="isLoading.workshops">Загрузка...</span>
      </div>

      <div class="form-group">
        <label>Сотрудник:</label>
        <select
          v-model="formData.employee"
          @change="onEmployeeChange"
          :disabled="isLoading.employees || !formData.workshop"
        >
          <option value="">Выберите сотрудника</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
        <span v-if="isLoading.employees">Загрузка...</span>
      </div>

      <div class="form-group">
        <label>Бригада:</label>
        <select v-model="formData.brigade" @change="onBrigadeChange" :disabled="isLoading.brigades">
          <option value="">Выберите бригаду</option>
          <option v-for="brigade in brigades" :key="brigade.id" :value="brigade.id">
            {{ brigade.name }}
          </option>
        </select>
        <span v-if="isLoading.brigades">Загрузка...</span>
      </div>

      <div class="form-group">
        <label>Смена:</label>
        <select v-model="formData.shift" @change="onShiftChange" :disabled="isLoading.shifts">
          <option value="">Выберите смену</option>
          <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
            {{ shift.name }}
          </option>
        </select>
        <span v-if="isLoading.shifts">Загрузка...</span>
      </div>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/entities/form/model/store'
import {
  fetchCities,
  fetchWorkshops,
  fetchEmployees,
  fetchBrigades,
  fetchShifts,
} from '@/shared/api/api'

const formData = ref({
  city: '',
  workshop: '',
  employee: '',
  brigade: '',
  shift: '',
})

const isLoading = ref({
  cities: false,
  workshops: false,
  employees: false,
  brigades: false,
  shifts: false,
})

const cities = ref([])
const workshops = ref([])
const employees = ref([])
const brigades = ref([])
const shifts = ref([])

const router = useRouter()
const formStore = useFormStore()

const loadCities = async () => {
  try {
    isLoading.value.cities = true
    cities.value = await fetchCities()
  } catch (error) {
    console.error('Ошибка при загрузке городов:', error)
  } finally {
    isLoading.value.cities = false
  }
}

const onCityChange = async () => {
  if (!formData.value.city) return

  try {
    isLoading.value.workshops = true
    workshops.value = await fetchWorkshops(formData.value.city)
    formData.value.workshop = ''
    formData.value.employee = ''
    formData.value.brigade = ''
    formData.value.shift = ''
    employees.value = []
    brigades.value = []
    shifts.value = []
  } catch (error) {
    console.error('Ошибка при загрузке цехов:', error)
  } finally {
    isLoading.value.workshops = false
  }
}

const onWorkshopChange = async () => {
  if (!formData.value.workshop) return

  try {
    isLoading.value.employees = true
    employees.value = await fetchEmployees(formData.value.workshop)
    formData.value.employee = ''
    formData.value.brigade = ''
    formData.value.shift = ''
    brigades.value = []
    shifts.value = []
  } catch (error) {
    console.error('Ошибка при загрузке сотрудников:', error)
  } finally {
    isLoading.value.employees = false
  }
}

const onEmployeeChange = async () => {
  if (!formData.value.employee) return

  try {
    isLoading.value.brigades = true
    brigades.value = await fetchBrigades(formData.value.employee)
    formData.value.brigade = ''
    formData.value.shift = ''
    shifts.value = []
  } catch (error) {
    console.error('Ошибка при загрузке бригад:', error)
  } finally {
    isLoading.value.brigades = false
  }
}

const onBrigadeChange = async () => {
  try {
    isLoading.value.shifts = true
    shifts.value = await fetchShifts(formData.value.brigade)
  } catch (error) {
    console.error('Ошибка при загрузке смен:', error)
  } finally {
    isLoading.value.shifts = false
  }
}

const onShiftChange = async () => {
  try {
    isLoading.value.shifts = true
    shifts.value = await fetchShifts(formData.value.brigade)
  } catch (error) {
    console.error('Ошибка при загрузке смен:', error)
  } finally {
    isLoading.value.shifts = false
  }
}

const onSubmit = () => {
  const selectedCity = cities.value.find((city) => city.id === formData.value.city)
  const selectedWorkshop = workshops.value.find(
    (workshop) => workshop.id === formData.value.workshop,
  )
  const selectedEmployee = employees.value.find(
    (employee) => employee.id === formData.value.employee,
  )
  const selectedBrigade = brigades.value.find((brigade) => brigade.id === formData.value.brigade)
  const selectedShift = shifts.value.find((shift) => shift.id === formData.value.shift)

  formStore.saveFormData({
    ...formData.value,
    cityName: selectedCity?.name || '',
    workshopName: selectedWorkshop?.name || '',
    employeeName: selectedEmployee?.name || '',
    brigadeName: selectedBrigade?.name || '',
    shiftName: selectedShift?.name || '',
  })

  router.push('/result')
}

onMounted(() => {
  loadCities()
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  position: relative;
}

select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
