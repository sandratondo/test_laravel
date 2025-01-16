<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear ingredientes con datos de ejemplo
        Ingredient::create([
            'name' => 'Queso',
            'price' => 2.5,
        ]);

        Ingredient::create([
            'name' => 'Jamon',
            'price' => 3.0,
        ]);

        Ingredient::create([
            'name' => 'Piña',
            'price' => 1.5,
        ]);
    }
}
