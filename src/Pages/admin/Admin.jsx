import React from 'react'
import { Box ,useTheme } from '@mui/material'
import Header from '../../Components/Header/Header.jsx'
import { DataGrid } from '@mui/x-data-grid'
import { useGetAdminsQuery } from '../../redux/Slices/user.js'
import CustomColumnMenu from '../../Components/CustomColumnMenu/CustomColumnMenu.jsx'
const Admin = () => {
    const theme = useTheme()
    const {data ,isLoading} = useGetAdminsQuery()
    console.log("🚀 ~ Admin ~ data:", data)
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.8,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.4,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 0.6,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.6,
        renderCell: (params) => params?.value?.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
      },
      {
        field: "country",
        headerName: "Country",
        flex: 0.4,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: .8,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 0.5,
      },
    ]

  return (
    <Box  m="1.5rem 2.5rem"  >
        <Header title="Admin" subtitle="Admin Dashboard"   />
            <Box mt="40px" height="75vh" 
                  sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            scrollbarColor: theme.palette.primary.light + theme.palette.background.alt + "!important",
                            "&::-webkit-scrollbar": {
                                backgroundColor: theme.palette.primary.light,
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: theme.palette.primary.light,
                                borderRadius: "8px",
                            },
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderBottom: "none",
                        },
        
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light,
                            
                            
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
                            color: `${theme.palette.secondary[200]}  !important`,
                        },
                        
                  }}
                >
                    <DataGrid
                       rows={data?.data || []}
                        columns={columns}
                        getRowId={(row) => row._id}
                        loading={isLoading}
                        components={{
                            ColumnMenu:CustomColumnMenu,
                        }}
              />
            </Box>
    </Box>
  )
}

export default Admin