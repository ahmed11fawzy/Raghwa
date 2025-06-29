import React from 'react'
import FlexBetween from "../FlexBetween/Flexbetween"
import {Search} from "@mui/icons-material"
import { IconButton, InputAdornment, TextField, Toolbar } from '@mui/material'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid'
const ToolBar = ({searchInput,setSearchInput,setSearch}) => {
  return (
        <GridToolbarContainer>
            <FlexBetween width="100%" >
                <FlexBetween>
                    <GridToolbarColumnsButton/>
                    <GridToolbarDensitySelector/>
                    <GridToolbarExport/>
                </FlexBetween>
                <TextField 
                    label="search ..."
                    sx={{mb:"0.3rem" , width:"15 rem"}}
                    variant='standard'
                    value={searchInput}
                    onChange={(e)=>{
                        setSearchInput(e.target.value)
                    }}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position='end' >
                                <IconButton
                                    onClick={()=>{
                                        setSearch(searchInput)
                                        setSearchInput("")
                                    }}
                                >
                                    <Search />
                                </IconButton>

                            </InputAdornment>
                        )
                    }}
                
                />
            </FlexBetween>
        </GridToolbarContainer>
    )
}

export default ToolBar