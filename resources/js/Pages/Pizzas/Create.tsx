import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Ingredient, PizzaFormData } from '@/types';

const CreatePizza = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]); // Inicializamos como un array vacío
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga para ingredientes
    const { data, setData, post } = useForm<PizzaFormData>({
        name: '',
        image: '',
        ingredient_ids: [],
    });

    useEffect(() => {
        // Cargar los ingredientes disponibles desde el backend
        axios.get('/pizzas/create').then((response) => {
            if (response.data && Array.isArray(response.data.ingredients)) {
                setIngredients(response.data.ingredients); // Guardar los ingredientes en el estado
            } else {
                console.error("La respuesta no contiene ingredientes válidos.");
            }
            setLoading(false); // Una vez que los ingredientes estén cargados, establecemos el estado de carga como falso
        }).catch((error) => {
            console.error("Error cargando los ingredientes:", error);
            setLoading(false); // En caso de error, aseguramos que el estado de carga se cambie
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pizzas'); // Esta ruta va al método `store` de PizzaController
    };

    // Si estamos cargando, mostramos un mensaje o un spinner
    if (loading) {
        return (
            <div className="text-center">
                <h1>Creando Pizza...</h1>
                <p>Cargando ingredientes...</p>
                {/* Aquí podrías agregar un spinner o algo similar */}
            </div>
        );
    }

    return (
        <div>
            <h1>Crear Pizza</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la pizza</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
                <div>
                    <label>Imagen de la pizza</label>
                    <input
                        type="text"
                        name="image"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                    />
                </div>
                <div>
                    <label>Ingredientes</label>
                    <select
                        multiple
                        value={data.ingredient_ids.map(id => id.toString())}  // Convertimos los números a cadenas
                        onChange={(e) =>
                            setData(
                                'ingredient_ids',
                                Array.from(e.target.selectedOptions, (option) => Number(option.value)) // Convertimos a números
                            )
                        }
                    >
                        {ingredients.length > 0 ? (
                            ingredients.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name} - {ingredient.price}€
                                </option>
                            ))
                        ) : (
                            <option disabled>No hay ingredientes disponibles</option>
                        )}
                    </select>
                </div>
                <button type="submit">Crear Pizza</button>
            </form>
        </div>
    );
};

export default CreatePizza;
