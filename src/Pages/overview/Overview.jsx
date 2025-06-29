import React, { useState } from 'react'

import Header from '../../Components/Header/Header.jsx'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import OverviewChart from '../../Components/OverviewChart/OverviewChart.jsx'
const Overview = () => {
    
    const [View, setView] =useState("units")

 
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
        <Box height={"75vh"} mt={2} >
            <FormControl  sx={{width: "200px"}}>
                <InputLabel  >View</InputLabel>
                <Select value={View} onChange={(e) => setView(e.target.value)}>
                    <MenuItem value="units">Units</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={View} />
        </Box> 
    </Box>
  )
}

export default Overview