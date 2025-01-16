import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post } = useForm({
        name: '',
        price: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/ingredients'); // Enviar la petición para crear un ingrediente
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Crear Ingrediente</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="input"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block">Precio (€)</label>
                    <input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="input"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Crear Ingrediente</button>
            </form>
        </div>
    );
};

export default Create;
