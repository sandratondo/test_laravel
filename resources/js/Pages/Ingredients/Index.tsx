import React from 'react';
import { Link } from '@inertiajs/react';

const Index = ({ ingredients }: { ingredients: any[] }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Ingredientes</h1>
            <Link href="/ingredients/create" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">Crear Ingrediente</Link>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center py-2">No hay ingredientes disponibles.</td>
                        </tr>
                    ) : (
                        ingredients.map((ingredient) => (
                            <tr key={ingredient.id}>
                                <td className="px-4 py-2">{ingredient.name}</td>
                                <td className="px-4 py-2">{ingredient.price} €</td>
                                <td className="px-4 py-2">
                                    <Link href={`/ingredients/${ingredient.id}/edit`} className="text-yellow-500">Editar</Link> | 
                                    <Link href={`/ingredients/${ingredient.id}`} className="text-blue-500">Ver</Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
