<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carts;
use App\Models\Products;

class CartsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $cart = Carts::where('idUserFK', $request->user->id)->paginate(isset($request->per_page) && $request->per_page >= 0 && $request->per_page <= 20 ? $request->per_page : 20);
        if (isset($cart) && count($cart) > 0) {
            $cart = $this->getCartItems($cart);
            return $cart;
        }
        
        return response(['message' => 'Cart is empty'], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'productId' => 'integer|required',
            'quantity' => 'integer|required'
        ]);

        $item = [
            'idUserFK' => $request->user->id,
            'idProductFK' => $request->attributes->get('productId'),
            'quantity' => $request->attributes->get('quantity')
        ];
        return Carts::create($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $cart = Carts::find($id);
        if (isset($product)) {
            $cart['product'] = $this->getCartItemProduct($cart);
            return $cart;
        }
        
        return response(['message' => 'Product not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $request->validate([
            'quantity' => 'integer|required'
        ]);

        $product = Carts::find($id);

        if (isset($product))
            return $product->update($request->all());
        return response(['message' => 'Products not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        return Carts::destroy($id);
    }

    /**
     * Get cart products
     * 
     * @param object cart
     * @return array cart with the product information
     */
    public function getCartItems($cart) {
        for($i = 0; $i < $cart; $i++)
            $cart[$i]['product'] = $this->getCartItemProduct($cart[$i]);
        return $cart;
    }

    /**
     * Get cart item product details
     * 
     * @param object cart
     * @return object product information
     */
    public function getCartItemProduct($cartItem) {
        $product = Products::find($cartItem->idProductFK);
        return $product;
    }
}
