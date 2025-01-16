<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PizzaController;
use App\Http\Controllers\IngredientController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//autentificaión
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    // Rutas para el CRUD de Pizzas
    Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index'); // Mostrar todas las pizzas
    Route::get('/pizzas/create', [PizzaController::class, 'create'])->name('pizzas.create'); // Mostrar formulario de creación
    Route::post('/pizzas', [PizzaController::class, 'store'])->name('pizzas.store'); // Crear una nueva pizza
    Route::get('/pizzas/{pizza}', [PizzaController::class, 'show'])->name('pizzas.show'); // Ver una pizza específica
    Route::get('/pizzas/{pizza}/edit', [PizzaController::class, 'edit'])->name('pizzas.edit'); // Editar una pizza
    Route::put('/pizzas/{pizza}', [PizzaController::class, 'update'])->name('pizzas.update'); // Actualizar una pizza
    Route::delete('/pizzas/{pizza}', [PizzaController::class, 'destroy'])->name('pizzas.destroy'); // Eliminar una pizza
});

Route::middleware(['auth'])->group(function () {
    // Rutas para el CRUD de Ingredientes
    Route::get('/ingredients', [IngredientController::class, 'index'])->name('ingredients.index'); // Mostrar todos los ingredientes
    Route::get('/ingredients/create', [IngredientController::class, 'create'])->name('ingredients.create'); // Mostrar formulario de creación
    Route::post('/ingredients', [IngredientController::class, 'store'])->name('ingredients.store'); // Crear un nuevo ingrediente
    Route::get('/ingredients/{ingredient}', [IngredientController::class, 'show'])->name('ingredients.show'); // Ver un ingrediente específico
    Route::get('/ingredients/{ingredient}/edit', [IngredientController::class, 'edit'])->name('ingredients.edit'); // Editar un ingrediente
    Route::put('/ingredients/{ingredient}', [IngredientController::class, 'update'])->name('ingredients.update'); // Actualizar un ingrediente
    Route::delete('/ingredients/{ingredient}', [IngredientController::class, 'destroy'])->name('ingredients.destroy'); // Eliminar un ingrediente
});

require __DIR__.'/auth.php';
