import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Ingredient, PizzaFormData } from '@/types';

const EditPizza = ({ pizza }: { pizza: PizzaFormData }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);  // Lista de ingredientes


    const { data, setData, put } = useForm<any>({
        name: pizza.name,
        image: pizza.image,
        ingredient_ids: pizza.ingredient_ids.map(String),  // Convierte números a cadenas
    });

    useEffect(() => {
        // Cargar los ingredientes disponibles desde el backend
        axios.get('/ingredients').then((response) => {
            setIngredients(response.data);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convertir los ingredient_ids de vuelta a números para el backend
        const ingredientIds = data.ingredient_ids.map((id: string) => Number(id));
        
        put(`/pizzas/${pizza.id}`, {
            ...data,
            ingredient_ids: ingredientIds, // Enviar los ids como números
        });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Editar Pizza</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="name">
                        Nombre de la pizza
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="image">
                        Imagen de la pizza
                    </label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="ingredients">
                        Ingredientes
                    </label>
                    <select
                        id="ingredients"
                        multiple
                        value={data.ingredient_ids.map(String)}  // Convertir a string[]
                        onChange={(e) =>
                            setData(
                                'ingredient_ids',
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.name} - {ingredient.price}€
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Actualizar Pizza
                </button>
            </form>
        </div>
    );
};

export default EditPizza;
