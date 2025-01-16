<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    //Mostrar todos los ingredientes.

    public function index()
    {
        $ingredients = Ingredient::all();
        return response()->json($ingredients);
    }

    //Crear un nuevo ingrediente.

    public function store(Request $request)
    {
        $ingredient = Ingredient::create([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return response()->json($ingredient, 201);
    }

    //Mostrar un ingrediente específico.

    public function show($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        return response()->json($ingredient);
    }

    // Actualizar un ingrediente.

    public function update(Request $request, $id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->update($request->only(['name', 'price']));

        return response()->json($ingredient);
    }

    //Eliminar un ingrediente.

    public function destroy($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();

        return response()->json(null, 204);
    }
}
