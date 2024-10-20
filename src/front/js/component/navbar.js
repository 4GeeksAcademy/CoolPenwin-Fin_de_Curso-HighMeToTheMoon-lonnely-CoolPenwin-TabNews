// navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout(); // Llama a la acción de logout
        navigate("/login"); // Redirige a la página de login
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        actions.addUserLanguage({ language: selectedLanguage });
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        actions.addUserCountry({ country: selectedCountry });
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">TapNews</span>
                </Link>
                <div className="ml-auto">
                    <select onChange={handleLanguageChange}>
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                    <select onChange={handleCountryChange}>
                        <option value="">Select Country</option>
                        <option value="us">United States</option>
                        <option value="es">Spain</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                    <Link to="/login">
                        <button className="btn btn-primary">Iniciar Sesión</button>
                    </Link>
                    <Link to="/AdministratorLogin">
                        <button className="btn btn-primary">Iniciar Sesión admin</button>
                    </Link>
                    <button className="btn btn-danger ml-2" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
