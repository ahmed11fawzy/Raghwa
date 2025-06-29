import React from 'react'
import { useGetAllUsersQuery } from '../../redux/Slices/user'
import { Box, useTheme } from '@mui/material'
import Header from '../../Components/Header/Header'
import { DataGrid } from '@mui/x-data-grid';
const Customers = () => {
    const { data, isLoading } = useGetAllUsersQuery()
    console.log("🚀 ~ Customers ~ data:", data)
    const theme = useTheme()
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
    <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subtitle="List of Customers"></Header>
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
                
                
      />
        </Box>
    </Box>
  )
}

export default Customers