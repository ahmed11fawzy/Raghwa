import React from 'react'
import { Box,useTheme,Typography,useMediaQuery,Button } from '@mui/material'
import FlexBetween from '../../Components/FlexBetween/Flexbetween.jsx'
import {DownloadOutlined ,Email,PointOfSale,PersonAdd,Traffic } from '@mui/icons-material'
import Header from '../../Components/Header/Header.jsx'
import { useGetDashboardQuery } from '../../redux/Slices/user.js'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from '../../Components/BreakdownChart/BreakdownChart.jsx'
import OverviewChart from '../../Components/OverviewChart/OverviewChart.jsx'
import StateBox from '../../Components/StateBox/StateBox.jsx'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDashboardQuery()
  console.log("🚀 ~ Dashboard ~ data:", data)
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
    <Box  m="1.5rem 2.5rem" >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
        </Box>
      </FlexBetween>
      <Box mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
        gridAutoRows="160px"
        sx={{  "& > div":{gridColumn:isNonMediumScreen ? undefined : "span 12" }}}
        >
          <StateBox
            title="Total Customers"
            value={data && data.totalCustomers}
            increase="+14%"
            description="Since last month"
            icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />

          <StateBox
            title="Sales Today"
            value={data && data.todayStats.totalSales}  
            increase="+21%"
            description="Since last month"
            icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            p="1rem"
          >
            <OverviewChart view="sales" isDashboard={true}  />
          </Box>
          <StateBox
            title="Monthly Sales"
            value={data && data.thisMonthStats.totalSales}
            increase="+5%"
            description="Since last month"
            icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
          <StateBox
            title="Yearly Sales"
            value={data && data.yearlySalesTotal}
            increase="+43%"
            description="Since last Year"
            icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
          {/* second row */}
          <Box 
            gridColumn="span 7"
            gridRow="span 3"
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
                        border: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
    
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.background.alt,
                        
                        
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
                rows={data && data.transaction}
                columns={columns}
                getRowId={(row) => row._id}
                loading={isLoading}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                }}
              />  
          </Box> 
          <Box
            gridColumn="span 5"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            p="1rem"
          >
            
            
              <Typography variant='h6' color={theme.palette.secondary[100]} >
                Sales By Category
              </Typography>
              <BreakdownChart isDashboard={true}  />
              <Typography  color={theme.palette.secondary[100]} >
                Breakdown of real states and information via categories for revenue made for this year and total sales.
              </Typography>
            
          
          </Box>         
      </Box>
    </Box>
  )
}

export default Dashboard