import React ,{ useMemo,useState} from 'react'
import Header from '../../Components/Header/Header'
import { Box ,useTheme } from '@mui/material'
import { useGetOverallStatQuery } from '../../redux/Slices/sales.js'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {ResponsiveLine } from '@nivo/line'
const Daily = () => {
   const [startDate, setStartDate] = useState(new Date("2021/01/01"));
  const [endDate, setEndDate] = useState(new Date("2021/02/01"));
  const theme = useTheme()
  const {data} = useGetOverallStatQuery()
  console.log("🚀 ~ Daily ~ data:", data)
  const[formattedData] = useMemo(() => {
     if(!data?.data ) return []
      const {dailyData} = data.data[0]
      const totalSalesLine = {
          id: "totalSales",
          color: theme.palette.secondary.main,
          data: [],
      }
      const totalUnitsLine = {
          id: "totalUnits",
          color: theme.palette.secondary[600],
          data: [],
      }
      Object.values(dailyData).forEach(({date, totalSales, totalUnits}) => {
        const formatedDate = new Date(date)
        if(formatedDate >= startDate && formatedDate <= endDate){
          const splitDate = date.substring(date.indexOf("-")+1)
          console.log("🚀 ~ Object.values ~ splitDate:", splitDate)
          totalSalesLine.data = [
              ...totalSalesLine.data,
              {x: splitDate, y: totalSales}
          ]
          totalUnitsLine.data = [
              ...totalUnitsLine.data,
              {x: splitDate, y: totalUnits}
          ]
        }
      })
      const formattedData = [totalSalesLine, totalUnitsLine]
      return [formattedData]
},[data, startDate, endDate, theme])



  return (
    <Box m="1.5rem 2.5rem" >
        <Header title="DAILY" subtitle=" Overview of daily revenue and profit "/>
        <Box height={"75vh"} mt={2} >
            <Box display="flex" justifyContent="flex-end" >
               <Box sx={{'& . react-datepicker-wrapper':{  backgroundColor: '#f0f0f0 !important', 
                        padding: '10px 15px',}}}>
                    <DatePicker
                    sx={{
                      '& .MuiInputBase-input': {
                        backgroundColor: '#f0f0f0',
                        padding: '10px 15px',
                      },
                      '& .react-datepicker__input-container': {
                         backgroundColor: '#f0f0f0 !important',
                        padding: '10px 15px',
                    }
                    }
                    }

                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
               </Box>
               <Box>
                  <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
               </Box>
            </Box>
            {data ? (
              <ResponsiveLine
                      data={formattedData}
                      theme={{
                              axis: {
                                  domain: {
                                      line: {
                                          stroke: theme.palette.secondary[200]
                                      }
                                  },
                                  legend: {
                                      text: {
                                          fill: theme.palette.secondary[200]
                                      }
                                  },
                                  ticks: {
                                      line: {
                                          stroke: theme.palette.secondary[200],
                                          strokeWidth: 1
                                      },
                                      text: {
                                          fill: theme.palette.secondary[200]
                                      }
                                  },
                                  legends: {
                                      text: {
                                          fill: theme.palette.secondary[200]
                                      }
                                  },
                                  tooltip: {
                                      container: {
                                          color: theme.palette.secondary[200]
                                      }
                                  }
                              },
                               labels: {
                                text: {
                                    fill: "#ffffff", // White color for better contrast with dark background
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    padding: 4,
                                    borderRadius: 2
                                }
                            }
                      }}
                      colors={{ datum: 'color' }}
                      margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                      xScale={{ type: 'point' }}
                      yScale={{
                          type: 'linear',
                          min: 'auto',
                          max: 'auto',
                          stacked: false,
                          reverse: false
                      }}
                      yFormat=" >-.2f"
                      curve="catmullRom"
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                          format:(v)=>{
                              
                                  return v.slice(0, 3)
                              
                          },
                          orient: 'bottom',
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 90,
                          legend:  "Month",
                          legendOffset: 60,
                          legendPosition: 'middle',
                          truncateTickAt: 0
                      }}
                      axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Total',  
                          legendOffset: -50,
                          legendPosition: 'middle',
                          truncateTickAt: 0
                      }}
                      enableGridX={false}
                      enableGridY={false}
                      pointSize={10}
                      pointColor={{ theme: 'background' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'serieColor' }}
                      pointLabel={function(e){return e.point.data.y}} 
                      pointLabelColor={function() { return "#ffffff" }}
                      pointLabelStrokeColor="#000000" 
                      pointLabelYOffset={-12}
                      enableTouchCrosshair={true}
                      useMesh={true}
                      legends={ [
                          {
                              anchor: 'top-right',
                              direction: 'column',
                              justify: false,
                              translateX: 50,
                              translateY: 0,
                              itemsSpacing: 0,
                              itemDirection: 'left-to-right',
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: 'circle',
                              symbolBorderColor: 'rgba(245, 58, 58, 0.88)',
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemBackground: 'rgba(0, 0, 0, .03)',
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                  />
            ): (
                <>Loading...</>
            )}
        </Box>
    </Box>

  )
}

export default Daily