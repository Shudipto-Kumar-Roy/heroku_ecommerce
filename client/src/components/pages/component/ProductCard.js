import React from 'react';
import {Rating} from '@material-ui/lab';
import "./ProductCard.css";
const ProductCard = ({product}) => {
    return (
        <>
            <div className="productcard mx-auto">
                <div className="productcardimage">
                    <img
                        src={product.images[0].url}
                        alt="Product"
                    />
                </div>
                <div className="productcardcontent">
                    <h2 className="cardheading">
                        {product.name} (<span>{product.category}</span>)
                    </h2>
                    <div className="cardratingcontainer">
                        <Rating
                            readOnly={true}
                            size="large"
                            precision={0.5}
                            value={product.ratings}
                        />
                        <span>({product.numOfReviews} reviews)</span>
                    </div>
                    <h5 className="cardprice">
                        Price : <span className="currency">&#2547; </span>
                        {product.price}
                    </h5>
                </div>
            </div>


        </>
    )
}

export default ProductCard