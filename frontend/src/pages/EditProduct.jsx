import React, { useState, useEffect } from 'react'
import ProductForm from '../components/ProductForm'
import {Card} from 'reactstrap'
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const [product, setProduct] = useState()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/${params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setProduct(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const updateProduct = (e) => {
        console.log(e);
        var data = {
            //_token: "{{ csrf_token() }}",
            'name': e.target[0].value,
            'description': e.target[1].value,
            'price': parseInt(e.target[2].value),
            'quantity': parseInt(e.target[3].value),
        };

        console.log(data);
        fetch(`http://127.0.0.1:8000/api/products/${params.id}`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    //navigate(-1, { replace: true });
                },
                (error) => {
                    console.log(error);
                    setError(error);
                }
            )
    }

    if (error)
        return <div>Error: {error.message}</div>;
    else if (!isLoaded)
        return <div>Loading...</div>;
    else {
        return (
            <div>
                {product.message ? product.message
                    : <Card
                        body
                        color="dark"
                        inverse
                        className="cards"
                    >
                        <ProductForm productName={product.name} productDescription={product.description} productPrice={product.price} productQuantity={product.quantity} onSubmit={updateProduct} />
                    </Card>}
            </div>
        )
    }
}
