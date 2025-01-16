import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ingredient } from '@/types';

const ShowPizza = ({ pizzaId }: { pizzaId: number }) => {
    const [pizza, setPizza] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar la pizza desde el backend
        axios.get(`/pizzas/${pizzaId}`).then((response) => {
            setPizza(response.data.pizza);
            setLoading(false);
        });
    }, [pizzaId]);

    if (loading) {
        return (
            <div className="text-center">
                <h1>Cargando pizza...</h1>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">{pizza.name}</h1>
            <div className="mb-4">
                <img src={pizza.image} alt={pizza.name} className="w-full h-64 object-cover rounded-md" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Ingredientes:</h2>
            <ul className="list-disc pl-6 mb-4">
                {pizza.ingredients.map((ingredient: Ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.price}€
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2">Precio Total:</h2>
            <p>{pizza.price}€</p>
        </div>
    );
};

export default ShowPizza;
