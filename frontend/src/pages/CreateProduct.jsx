import React, { useState, useEffect } from 'react'
import ProductForm from '../components/ProductForm'
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const {error, setError} = useState(null);
    const navigate = useNavigate();

    const createProduct = (e) => {
        console.log(e);
        var data = {
            //_token: "{{ csrf_token() }}",
            'name': e.target[0].value,
            'description': e.target[1].value,
            'price': parseInt(e.target[2].value),
            'quantity': parseInt(e.target[3].value),
        };

        fetch(`http://127.0.0.1:8000/api/products/`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    navigate(-1, { replace: true });
                },
                (error) => {
                    setError(error);
                }
            )
    }
    return (
        <div>
            <ProductForm onSubmit={createProduct} />
        </div>
    )
}