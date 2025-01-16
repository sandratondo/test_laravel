<?php
namespace App\Http\Controllers;

use App\Models\Pizza;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class PizzaController extends Controller
{
    // Mostrar todas las pizzas.
    public function index()
    {
        $pizzas = Pizza::with('ingredients')->get();
        return response()->json($pizzas);
    }


     // Crear una nueva pizza.
    public function store(Request $request)
    {
        $pizza = Pizza::create([
            'name' => $request->name,
            'image' => $request->image,
        ]);

        $pizza->ingredients()->attach($request->ingredient_ids);

        return response()->json($pizza, 201);
    }


     //Mostrar una pizza específica.
    public function show($id)
    {
        $pizza = Pizza::with('ingredients')->findOrFail($id);
        $price = $pizza->calculatePrice();

        return response()->json(['pizza' => $pizza, 'price' => $price]);
    }


     // Actualizar una pizza.
    public function update(Request $request, $id)
    {
        $pizza = Pizza::findOrFail($id);
        $pizza->update($request->only(['name', 'image']));

        $pizza->ingredients()->sync($request->ingredient_ids);

        return response()->json($pizza);
    }


     //Eliminar una pizza.
    public function destroy($id)
    {
        $pizza = Pizza::findOrFail($id);
        $pizza->delete();

        return response()->json(null, 204);
    }
}
