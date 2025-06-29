import React from 'react'
import Header from '../../Components/Header/Header'
import {useGetProductsQuery} from '../../redux/Slices/product'
import { Box, Button, Card, CardActions, CardContent, Collapse, LinearProgress, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'


/* reuseable product */

const Product = ({_id, name, description, price, rating, category, supply, stat }) => {
    const theme=useTheme()
    const [isExpanded, setIsExpanded] = React.useState(false)
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Card sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "0.55rem" }}>
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]} >
                    {Number(price).toFixed(2)}
                </Typography>
                <Rating name="read-only" value={rating} readOnly precision={0.5}  />
                <Typography variant='body2'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant='primary' size='small' onClick={handleExpandClick} sx={{ color: theme.palette.secondary[100] }}>
                    {isExpanded ? "Show Less" : "Show More"}
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                <CardContent sx={{ backgroundColor: theme.palette.background.alt }}>
                    <Typography variant='body2' color={theme.palette.secondary[300]}>
                        ID: {_id}
                    </Typography>
                    <Typography>
                        Supply Left: {supply}
                    </Typography>
                    <Typography>
                        Yearly Sales : {stat[0].yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold: {stat[0].yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

    )
}










const Products = () => {
    const isNonMobile=useMediaQuery("(min-width:1000px)")
    const {data,isLoading}=useGetProductsQuery()
    const theme=useTheme()
    console.log("🚀 ~ Products ~ data,isLoading:",isLoading)
    console.log("🚀 ~ Products ~ data:", data,isLoading)
  return (
    <Box m={"1.5rem 2.5rem"}  >
        <Header title="PRODUCTS" subtitle="See your List of Products"/>
        {data || !isLoading ? (
            <Box mt={"20px"} display="grid" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
            justifyContent={"space-between"} 
            rowGap="20px" columnGap="1.33%"
            sx={{
                "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                },
            }}
            
            >
                {data.data.map(({_id, name, description, price, rating, category, supply,stat}) => (
                    <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={stat} />
                ))}
            </Box>
        ) : (
            <LinearProgress color={theme.palette.secondary[100]} />
        )}
    </Box>
  )
}

export default Products