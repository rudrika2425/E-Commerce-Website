import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
    const { productId } = useParams();
    const { all_product } = useContext(ShopContext);
    const product = all_product.find((item) => item.id === Number(productId));

    // Handle case where product is not found
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
};

export default Product;
