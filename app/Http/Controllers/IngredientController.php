<?php
namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index()
    {
        // Obtener todos los ingredientes
        $ingredients = Ingredient::all();
        
        // Pasar los ingredientes a la vista usando Inertia
        return inertia('Ingredients/Index', [
            'ingredients' => $ingredients
        ]);
    }

    public function create()
    {
        // Simplemente muestra la vista para crear un ingrediente
        return inertia('Ingredients/Create');
    }

    public function store(Request $request)
    {
        // Validar y crear un nuevo ingrediente
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        Ingredient::create([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        // Redirigir a la página de listado de ingredientes
        return redirect()->route('ingredients.index');
    }

    public function show($id)
    {
        try {
            $ingredient = Ingredient::findOrFail($id);
            return inertia('Ingredients/Show', [
                'ingredient' => $ingredient
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Ingrediente no encontrado'], 404);
        }
    }
    

    public function edit($id)
    {
        // Mostrar formulario de edición
        $ingredient = Ingredient::findOrFail($id);
        return inertia('Ingredients/Edit', [
            'ingredient' => $ingredient
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validar y actualizar ingrediente
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $ingredient = Ingredient::findOrFail($id);
        $ingredient->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('ingredients.index');
    }

    public function destroy($id)
    {
        // Eliminar ingrediente
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();

        return redirect()->route('ingredients.index');
    }
}

