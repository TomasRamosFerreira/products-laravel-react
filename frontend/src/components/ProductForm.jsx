import React, { useState, useEffect } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default function ProductForm({productName, productDescription, productPrice, productQuantity, onSubmit}) {
    const [name, setName] = useState(productName ? productName : "");
    const [description, setDescription] = useState(productDescription ? productDescription : "");
    const [price, setPrice] = useState(productPrice ? productPrice : "");
    const [quantity, setQuantity] = useState(productQuantity ? productQuantity : "");
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        name && description && price && quantity ? setSubmitDisabled(false) : setSubmitDisabled(true)
    }, [name, description, price, quantity])

    const handleSubmite = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <div>
            <Form onSubmit={handleSubmite}>
                <FormGroup>
                    <Label for="productName">
                        Name
                    </Label>
                    <Input
                        id="productName"
                        name="product name"
                        placeholder="Product name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="productDescription">
                        Description
                    </Label>
                    <Input
                        id="productDescription"
                        name="product description"
                        placeholder="Product description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="examplePrice">
                                Price
                            </Label>
                            <Input
                                id="productPrice"
                                name="product price"
                                placeholder="Product price"
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="productQuantity">
                                Quantity
                            </Label>
                            <Input
                                id="productQuantity"
                                name="product quantity"
                                placeholder="Product quantity"
                                type="number"
                                onChange={(e) => setQuantity(e.target.value)}
                                value={quantity}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" disabled={submitDisabled}>Submit</Button>
            </Form>
        </div>
    )
}
