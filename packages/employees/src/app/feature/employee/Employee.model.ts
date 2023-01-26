export type Employee = {
  id: string
  name: string
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Completed = 'completed',
  Error = 'error',
}

export type EmployeeState = {
  employees: Employee[]
  status: Status
}
