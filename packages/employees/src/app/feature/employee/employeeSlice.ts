import { Employee, EmployeeState, Status } from '@org-react-node/shared-utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export const initialState: EmployeeState = {
  employees: [],
  status: Status.Idle,
}

export const employeeAsyncThunk = createAsyncThunk('employee/loadEmployees', async () => {
  try {
    const employeesResponse = await fetch('http://localhost:3001/employees', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const employees: Employee[] = await employeesResponse.json()
    return employees
  } catch (error: unknown) {
    throw new Error('unexpected error')
  }
})

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeAsyncThunk.pending, (state) => {
        state.status = Status.Loading
      })
      .addCase(employeeAsyncThunk.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload
        state.status = Status.Completed
      })
      .addCase(employeeAsyncThunk.rejected, (state) => {
        state.status = Status.Error
        state.employees = []
      })
  },
})

export const selectEmployeesState = (state: RootState) : EmployeeState => state.employees

export default employeeSlice.reducer
