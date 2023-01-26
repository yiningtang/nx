import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EmployeeList } from './EmployeeList'
import fetchMock from 'jest-fetch-mock';
import EMPLOYEES from './employees.mock.json';
import { store } from '../../store';

describe('', () => {
  it('Should render EmployeeList component with intial state', async () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>,
    )
    await waitFor(async () => {
      const loadingIcon: HTMLElement = await screen.findByTestId('loading')
      expect(loadingIcon).toBeInTheDocument()
    })
  })

  describe('Render EmployeeList component', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })
    it('Should render employee list when emoloyee list is fetched successfully', async () => {
      fetchMock.mockResponse(JSON.stringify(EMPLOYEES))
      render(
        <Provider store={store}>
          <EmployeeList />
        </Provider>,
      )

      await waitFor(() => {
        const employeeList = screen.getByTestId('list')
        expect(employeeList).toBeInTheDocument()
      })
    })

    it('Should render error icon when emoloyee list is fetched unsuccessfully', async () => {
      fetchMock.mockReject(new Error())
      render(
        <Provider store={store}>
          <EmployeeList />
        </Provider>,
      )

      await waitFor(() => {
        const errorIcon = screen.getByTestId('error')
        expect(errorIcon).toBeInTheDocument()
      })
    })
  })
})
