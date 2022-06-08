import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard'
import { useAppContext } from '../../context/UseContext';

export default function ResponsiveGrid() {

    const { products } = useAppContext();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {products && products.map((element) => (
                    <Grid item xs={2} sm={4} md={3} key={element.id}>
                        <ProductCard
                            id={element.id}
                            product={element}
                            title={element.title}
                            description={element.description}
                            img={element.img}
                            materials={element.materials}
                            price={element.price}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}