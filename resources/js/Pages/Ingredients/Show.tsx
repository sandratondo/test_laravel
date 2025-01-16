import React, { useEffect, useState } from 'react';

const Show = ({ id }: { id: string }) => {
    const [ingredient, setIngredient] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);  // Para manejar errores

    useEffect(() => {
        if (id) {
            fetch(`/ingredients/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo cargar el ingrediente');
                    }
                    return response.json();
                })
                .then(data => {
                    setIngredient(data);
                })
                .catch(error => {
                    console.error('Error fetching ingredient:', error);
                    setError('Error al cargar el ingrediente');
                });
        }
    }, [id]);

    // Mostrar mensajes de error o cargando mientras esperamos la respuesta
    if (error) return <div className="container mx-auto p-4">{error}</div>;
    if (!ingredient) return <div className="container mx-auto p-4">Cargando...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Detalles del Ingrediente</h1>
            <div>
                <strong>Nombre:</strong> {ingredient.name}
            </div>
            <div>
                <strong>Precio:</strong> {ingredient.price} €
            </div>
        </div>
    );
};

export default Show;
