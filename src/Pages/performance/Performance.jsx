import React from 'react'
import Header from '../../Components/Header/Header.jsx'
import { Box, useTheme } from '@mui/material'
import { useGetPerformanceQuery } from '../../redux/Slices/user.js'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'

const Performance = () => {
    const theme = useTheme()
    const userId=useSelector((state)=>state.theme.userId)
    const { data, isLoading } = useGetPerformanceQuery(userId)
    console.log("🚀 ~ Performance ~ data:", data)
     const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.8,
      },
      {
        field: "userId",
        headerName: "User ID",
        flex: 0.8,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 0.6,
      },
      {
        field: "products",
        headerName: "# of Products",
        flex: 0.6,
        sortable: false,
        renderCell: (params) => params?.value?.length,
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: .8,
        renderCell: (params) => `$${Number(params?.value).toFixed(2)}`,
      },
     
    ]
    return (
    <Box m="1.5rem 2.5rem" >
        <Header title="PERFORMANCE" subtitle="Track where your sales are coming from" />
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
                       rows={data && data?.sales || []}
                        columns={columns}
                        getRowId={(row) => row._id}
                        loading={isLoading}
                        
              />
            </Box>
    </Box>
  )
}

export default Performance