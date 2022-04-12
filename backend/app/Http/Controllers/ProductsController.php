<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductsController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        return Products::paginate(isset($request->per_page) && $request->per_page >= 0 && $request->per_page <= 20 ? $request->per_page : 20);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'name' => 'string|required',
            'description' => 'string|required',
            'price' => 'integer|required',
            'quantity' => 'integer|required'
        ]);

        return Products::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $product = Products::find($id);
        if (isset($product))
            return response($product, 200);
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
            'name' => 'string|required',
            'description' => 'string|required',
            'price' => 'integer|required',
            'quantity' => 'integer|required'
        ]);

        $product = Products::find($id);

        if (isset($product))
            return $product->update($request->all());
        return response(['message' => 'Product not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        return Products::destroy($id);
    }
}
