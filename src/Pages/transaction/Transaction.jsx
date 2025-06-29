/* eslint-disable no-unused-vars */
import React, {  useState } from 'react'
import {useTheme} from '@mui/material/styles'
import {useGetAllTransactionsQuery} from '../../redux/Slices/user.js'
import {DataGrid} from '@mui/x-data-grid'

import Header from '../../Components/Header/Header.jsx'
import { Box } from '@mui/material'
import ToolBar from '../../Components/DataGridToolBar/ToolBar.jsx'



const Transaction = () => {
    const theme = useTheme()
    const [sort, setSort] = React.useState({})
    const [search, setSearch] = React.useState("")
    const [searchInput, setSearchInput] = useState("")
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(25)
    const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
    const {data, isLoading, isError} = useGetAllTransactionsQuery(
      {
        sort:JSON.stringify(sort),
        search,
        page:paginationModel.page + 1, 
        pageSize:paginationModel.pageSize,
      })
    console.log(data, isLoading, isError)
      
    

    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.8,
      },
      {
        field: "userId",
        headerName: "User ID",
        flex: .8,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 0.6,
      },
      {
        field: "products",
        headerName: "# of Products",
        flex: 0.6,
        sortable:false,
        renderCell: (parms)=>parms.value.length,
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell:(parms)=> `$${Number(parms.value).toFixed(2)}`
      },
      
    ]
    return (
        <Box m="1.5rem 2.5rem" >
          <Header title="Transaction" subtitle="List of Transaction for future reference" />
          <Box height='75vh' mt=""
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
            rowCount={data?.total || 0}
            columns={columns}
            getRowId={(row) => row._id}
            loading={isLoading}
            pageSizeOptions={[25, 50, 100]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={ (newPaginationModel) =>  setPaginationModel(newPaginationModel)}
             sortingMode='server'
             onSortModelChange={(newSortModel)=>setSort(newSortModel.length ? newSortModel[0] : {})}
            slots={{toolbar:ToolBar }}
            slotProps={{
              toolbar: {searchInput,setSearch, setSearchInput}
            }}
          />  
          </Box>          
        </Box>
  )
}

export default Transaction