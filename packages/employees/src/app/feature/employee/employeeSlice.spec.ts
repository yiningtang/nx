
import { EmployeeState, Status } from '@org-react-node/shared-utils'
import employeeReducer, { employeeAsyncThunk } from './employeeSlice'
import { EMPLOYEES } from '@org-react-node/shared-utils';
import { waitFor } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { store } from '../../store'

describe('Employee reducer', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const initialState: EmployeeState = {
    employees: [],
    status: Status.Idle,
  }
  it('should handle initial state', () => {
    expect(employeeReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  describe('should load employees async', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })
  
    it('should start loading employees when the async load employees action is dispatched', () => {
      store.dispatch(employeeAsyncThunk())
      const receivedEmployeeState = store.getState().employees
      const expectedEmployeeState = {
        employees: [],
        status: Status.Loading,
      }
      expect(receivedEmployeeState).toEqual(expectedEmployeeState)
    })

    it('should load employees successfully when the endpoint is resolved with expected response', async () => {
      fetchMock.mockResponse(JSON.stringify(EMPLOYEES))
      store.dispatch(employeeAsyncThunk())
      await waitFor(() => {
        const receivedEmployeeState = store.getState().employees
        const expectedEmployeeState = {
          employees: EMPLOYEES,
          status: Status.Completed,
        }
        expect(receivedEmployeeState).toEqual(expectedEmployeeState)
      })
    })

    it('should show error state when the endpoint is not resolved and returned some errors', async () => {
      fetchMock.mockRejectedValue(new Error('unexpected error'))
      store.dispatch(employeeAsyncThunk())
      await waitFor(() => {
        const receivedEmployeeState = store.getState().employees
        const expectedEmployeeState = {
          employees: [],
          status: Status.Error,
        }
        expect(receivedEmployeeState).toEqual(expectedEmployeeState)
      })
    })
  })
})
