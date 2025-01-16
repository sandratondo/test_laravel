<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image'];

    // Relación de muchos a muchos con ingredientes.

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'ingredient_pizza');
    }

    // Calcular el precio de la pizza.

    public function calculatePrice()
    {
        $total = $this->ingredients->sum('price');
        return $total + ($total * 0.5); // 50% de recargo
    }
}
