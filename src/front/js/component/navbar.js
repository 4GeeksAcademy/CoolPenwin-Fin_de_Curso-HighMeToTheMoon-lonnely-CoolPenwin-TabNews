// navbar.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        // Cargar categorías al iniciar
        actions.updateCategoriesFromAPI();
    }, [actions]);

    const handleCountryChange = (country) => {
        setSelectedCountries(prev => 
            prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
        );
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguages(prev => 
            prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
        );
    };

    const handleSavePreferences = () => {
        // Aquí puedes guardar las preferencias en el backend
        actions.saveUserPreferences({ countries: selectedCountries, languages: selectedLanguages });
    };

    const handleLogout = () => {
        actions.logout(); // Llama a la acción de logout
        navigate("/login"); // Redirige a la página de login
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">TapNews</span>
                </Link>
                <div className="ml-auto">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="countryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Select Country
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="countryDropdown">
                            {/* Aquí debes mapear las opciones de país */}
                            {['us', 'gb', 'fr', 'de'].map(country => (
                                <li key={country}>
                                    <a className="dropdown-item" onClick={() => handleCountryChange(country)}>
                                        {country}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Select Language
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                            {/* Aquí debes mapear las opciones de idioma */}
                            {['en', 'es', 'fr', 'de'].map(language => (
                                <li key={language}>
                                    <a className="dropdown-item" onClick={() => handleLanguageChange(language)}>
                                        {language}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="btn btn-primary" onClick={handleSavePreferences}>
                        Save Preferences
                    </button>
                    <Link to="/login">
                        <button className="btn btn-primary">Iniciar Sesión</button>
                    </Link>
                    <button className="btn btn-danger ml-2" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
