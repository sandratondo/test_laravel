import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

interface Pizza {
    id: number;
    name: string;
    image: string;
    ingredients: { name: string; price: number }[];
}

const Index = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    useEffect(() => {
        axios.get('/pizzas').then((response) => {
            setPizzas(response.data);
        });
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Pizzas</h1>
            <Link href="/pizzas/create" className="bg-blue-500 text-white py-2 px-4 rounded mb-6 inline-block">
                Crear Pizza
            </Link>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{pizza.name}</h2>
                            <div className="mt-2">
                                <h3 className="text-gray-600">Ingredientes:</h3>
                                <ul className="list-disc pl-5">
                                    {pizza.ingredients.map((ingredient, index) => (
                                        <li key={index} className="text-gray-700">
                                            {ingredient.name} - {ingredient.price}€
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-4 font-bold text-lg">
                                Precio Total: {pizza.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) * 1.5}€
                            </p>
                            <div className="mt-4">
                                <Link href={`/pizzas/${pizza.id}`} className="text-blue-500 hover:text-blue-700">
                                    Ver más
                                </Link> | 
                                <Link href={`/pizzas/${pizza.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
                                    Editar
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
