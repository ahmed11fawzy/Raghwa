import React from 'react'
import Header from '../../Components/Header/Header'
import { useGetGeographyQuery } from '../../redux/Slices/user'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { LinearProgress } from '@mui/material'
import {ResponsiveChoropleth} from '@nivo/geo'
import {geoData} from '../../redux/geoData'
const Geography = () => {
    const { data, isLoading } = useGetGeographyQuery()
    const theme = useTheme()
    console.log(data)

    return (
        <Box m={"1.5rem 2.5rem"}>
            <Header title="GEOGRAPHY" subtitle="Find where your users are located" />
                <Box
                    height="75vh"
                    border={`1px solid ${theme.palette.secondary[200]}`}
                    borderRadius="4px"
                    mt="40px"
                >
                    {data || !isLoading ?
                     (
                        <ResponsiveChoropleth
                        data={data.data}
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
                        }}
                        features={geoData.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                        domain={[ 0, 60 ]}
                        unknownColor="#666666"
                        colors="blues"
                        label="properties.name"
                        value="value"
                        valueScale={{ type: 'linear' }}
                        valueFormat=".2s"
                        projectionScale={150}
                        projectionType='mercator'
                        projectionTranslation={[ 0.45, 0.6 ]}
                        projectionRotation={[ 0, 0, 0 ]}
                        enableGraticule={true}
                        borderWidth={1.3}
                        borderColor="#ffffff"    
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: true,
                                translateX: 0,
                                translateY: -125,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: 'left-to-right',
                                itemTextColor: theme.palette.secondary[200],
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: theme.palette.secondary[200],
                                            
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                          /* tooltip={({ feature }) => {
                            const countryData = data.data.find(item => item.id === feature.id);
                            return (
                            <div style={{
                                background: theme.palette.background.alt,
                                padding: '9px 12px',
                                border: `1px solid ${theme.palette.secondary[200]}`,
                                color: theme.palette.secondary[200]
                            }}>
                                <strong>{feature.properties.name}</strong>
                                {countryData ? `: ${countryData.value}` : ': No data'}
                            </div>
                            );
                        }} */
                    />
                     )
                     : 
                     (
                        <LinearProgress color={theme.palette.secondary[100]} />
                    )}
                </Box>
            
        </Box>
  )
}

export default Geography