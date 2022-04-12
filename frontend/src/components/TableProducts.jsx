import React from 'react'
import { Button, Table } from 'reactstrap'
import '../assets/styles/tableProducts.scss'

export default function TableProducts({products, handleDelete}) {
    const deleteConfirmation = (product) => (
        window.confirm('Are you sure you wish to delete this item?') ? handleDelete(product) : null
    );
    return (
        <div>
            <Table
                bordered
                dark
                hover
                responsive
                striped
            >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Product name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Quantity in stock
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr>
                            <th scope="row">
                                {++index}
                            </th>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.quantity}
                            </td>
                            <td>
                                <a href={`/products/edit/${product.id}`}><Button className="action-button">Edit</Button></a>
                                <Button className="action-button" onClick={() => deleteConfirmation(product.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
