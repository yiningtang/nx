import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Employee, Status } from './Employee.model'
import { employeeAsyncThunk, selectEmployeesState } from './employeeSlice'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import DownloadingIcon from '@mui/icons-material/Downloading'
import ErrorIcon from '@mui/icons-material/Error'

export function EmployeeList() {
  const { employees, status } = useAppSelector(selectEmployeesState)
  const disptach = useAppDispatch()
  useEffect(() => {
    disptach(employeeAsyncThunk())
  }, [])
  return (
    <>
      {status === Status.Loading && <DownloadingIcon data-testid={'loading'} />}
      {status === Status.Error && <ErrorIcon data-testid={'error'} />}
      {status === Status.Completed && !!employees && (
        <List
          data-testid={'list'}
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {employees.map((employee: Employee) => (
            <ListItem key={employee.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>{' '}
              <ListItemText primary={employee.name} secondary={employee.id} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}
