<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price'];

    /**
     * Relación de muchos a muchos con pizzas.
     */
    public function pizzas()
    {
        return $this->belongsToMany(Pizza::class, 'ingredient_pizza');
    }
}

