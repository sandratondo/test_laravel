<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light dark">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Ingrediente</title>
</head>
<body>
    <h1>Crear Nuevo Ingrediente</h1>

    <form action="{{ route('ingredients.store') }}" method="POST">
        @csrf
        <div>
            <label for="name">Nombre del Ingrediente:</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="price">Precio del Ingrediente:</label>
            <input type="number" step="0.01" id="price" name="price" required>
        </div>

        <div>
            <button type="submit">Crear Ingrediente</button>
        </div>
    </form>
</body>
</html>
