import { defineStore } from 'pinia'

interface FormState {
  city: string
  workshop: string
  employee: string
  brigade: string
  shift: string
  cityName: string
  workshopName: string
  employeeName: string
  brigadeName: string
  shiftName: string
}

export const useFormStore = defineStore('form', {
  state: (): FormState => ({
    city: '',
    workshop: '',
    employee: '',
    brigade: '',
    shift: '',
    cityName: '',
    workshopName: '',
    employeeName: '',
    brigadeName: '',
    shiftName: '',
  }),

  actions: {
    saveFormData(data: FormState) {
      this.city = data.city
      this.workshop = data.workshop
      this.employee = data.employee
      this.brigade = data.brigade
      this.shift = data.shift
      this.cityName = data.cityName
      this.workshopName = data.workshopName
      this.employeeName = data.employeeName
      this.brigadeName = data.brigadeName
      this.shiftName = data.shiftName
    },
  },
})
