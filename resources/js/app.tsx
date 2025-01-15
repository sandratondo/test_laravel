import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    return (
        <div className="App">
            <h1 className="text-2xl font-bold">Bienvenido a Laravel + React + TypeScript</h1>
            {/* Aquí iría el resto de tu aplicación */}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
