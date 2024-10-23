import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/CardArticle";

export const AdministratorHomePage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedNewspapers, setSelectedNewspapers] = useState([]); // Estado para los periódicos seleccionados
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/administratorLogin");
        } else {
            actions.getAdministratorHomepage();
            actions.getDataArticle();
            actions.loadCategories();
        }
    }, []);

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleNewspaperChange = (newspaper) => {
        if (selectedNewspapers.includes(newspaper)) {
            setSelectedNewspapers(selectedNewspapers.filter((news) => news !== newspaper));
        } else {
            setSelectedNewspapers([...selectedNewspapers, newspaper]);
        }
    };

    const filteredArticles = store.Articles.filter((article) => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(article.category.name);
        const newspaperMatch = selectedNewspapers.length === 0 || selectedNewspapers.includes(article.newspaper.name);
        return categoryMatch && newspaperMatch;
    });

    return (
        <div className="container mt-5">
            <h1 className="text-danger">HOMEE privadoo admin</h1>
            <button className="btn btn-primary" onClick={actions.getArticleApiData}>traer datos de api</button>

            <div className="my-4">
                <button onClick={() => setShowFilters(!showFilters)} className="btn btn-info">
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>
            </div>

            {showFilters && (
                <div className="my-4">
                    <button onClick={() => setSelectedCategories([])} className="btn btn-secondary mx-2">
                        Todas las categorías
                    </button>
                    {store.categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`btn mx-2 ${selectedCategories.includes(category.name) ? "btn-success" : "btn-primary"}`}
                        >
                            {category.name}
                        </button>
                    ))}
                    <h5>Selecciona Periódicos:</h5>
                    {store.newspapers.map((newspaper, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={selectedNewspapers.includes(newspaper.name)}
                                onChange={() => handleNewspaperChange(newspaper.name)}
                            />
                            {newspaper.name}
                        </div>
                    ))}
                </div>
            )}

            <div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
                {filteredArticles.map((article, index) => (
                    <CardArticle
                        key={index}
                        title={article.title}
                        content={article.content}
                        image={article.image}
                        published_date={article.published_date}
                        source={article.source}
                        link={article.link}
                        author={article.author}
                        newspaper={article.newspaper}
                        category={article.category}
                        id={article.id}
                        showEditButton={true}
                        showDeleteButton={true}
                    />
                ))}
            </div>
        </div>
    );
};
