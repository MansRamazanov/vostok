interface City {
  id: string
  name: string
}

interface Workshop {
  id: string
  name: string
  cityId: string
}

interface Employee {
  id: string
  name: string
  workshopId: string
}

interface Brigade {
  id: string
  name: string
  employeeId: string
}

interface Shift {
  id: string
  name: string
  brigadeId: string
}

const mockCities: City[] = [
  { id: '1', name: 'Москва' },
  { id: '2', name: 'Санкт-Петербург' },
  { id: '3', name: 'Казань' },
]

const mockWorkshops: Workshop[] = [
  { id: '1', name: 'Цех №1', cityId: '1' },
  { id: '2', name: 'Цех №2', cityId: '1' },
  { id: '3', name: 'Цех №3', cityId: '2' },
  { id: '4', name: 'Цех №4', cityId: '2' },
  { id: '5', name: 'Цех №5', cityId: '3' },
  { id: '6', name: 'Цех №6', cityId: '3' },
]

const mockEmployees: Employee[] = [
  { id: '1', name: 'Ленин В.И.', workshopId: '1' },
  { id: '2', name: 'Сталин И.В.', workshopId: '1' },
  { id: '3', name: 'Хрущев Н.С.', workshopId: '2' },
  { id: '4', name: 'Брежнев Л.И.', workshopId: '3' },
]

const mockBrigades: Brigade[] = [
  { id: '1', name: 'Бригада №1', employeeId: '1' },
  { id: '2', name: 'Бригада №2', employeeId: '2' },
  { id: '3', name: 'Бригада №3', employeeId: '3' },
]

const mockShifts: Shift[] = [
  { id: '1', name: 'Смена №1', brigadeId: '1' },
  { id: '2', name: 'Смена №2', brigadeId: '2' },
  { id: '3', name: 'Смена №3', brigadeId: '3' },
]

export const fetchCities = async (): Promise<City[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockCities
}

export const fetchWorkshops = async (cityId: string): Promise<Workshop[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockWorkshops
}

export const fetchEmployees = async (workshopId: string): Promise<Employee[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEmployees
}

export const fetchBrigades = async (employeeId: string): Promise<Brigade[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBrigades
}

export const fetchShifts = async (brigadeId: string): Promise<Shift[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockShifts
}
