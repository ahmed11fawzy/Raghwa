import React, {  useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import { Box, useMediaQuery } from '@mui/material'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {useGetUserQuery} from '../../redux/Slices/user'
import { useSelector } from 'react-redux'
const Layout = () => {
  const userId=useSelector((state) => state.theme.userId)
  const { data: user } = useGetUserQuery(userId)
  useEffect(() => {
    
  }, [user])
  console.log(user)
  const isNOTMobile = useMediaQuery("(min-width: 600px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <Box display={isNOTMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar 
        drawerWidth={isSidebarOpen ? "250px" : "0px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isNOTMobile={isNOTMobile}
      />
      <Box   sx={ {width:  "100%" , transition:"width 1s ease"}} >
        <Navbar
          user={user?.data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout