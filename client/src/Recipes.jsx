import React, { useEffect, useState } from "react";
import { Card, Button, InputGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./Recipes.css";
import Recipe from "./Recipe";

const Recipes = () => {
  const [query, setQuery] = useState("pasta");
  const [recipes, setRecipes] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  axios.defaults.withCredentials = true;

  axios.get("http://localhost:5000/login").then((response) => {
    if (response.data.loggedIn === true) {
      setLoginStatus(response.data.user[0].username);
    }
  });

  const url = `http://localhost:5000/api/recipes/v2/${query}`;

  const getRecipes = async () => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    setRecipes(data);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.recipeQuery.value);
    getRecipes();
  };

  const styles = {
    cardImage: {
      width: "100%",
      height: "100%",
    },
    cardBody: {
      height: "200px",
      overflow: "auto",
    },
    cardTitle: {
      fontSize: "20px",
      textAlign: "center",
    },
    card: {
      height: "500px",
    },
    container: {
      marginBottom: "100px",
    },
    listItem: {
      margin: "0",
    },
    para: {
      display: "in-line",
    },
  };

  return (
    <>
      <div>
        <Form className="container" onSubmit={getSearch}>
          <InputGroup className="mb-3">
            <Form.Control
              name="recipeQuery"
              type="text"
              placeholder="pasta"
              aria-label="pasta"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              Search
            </Button>
          </InputGroup>
        </Form>
      </div>
      <div className="container" style={styles.container}>
        <Row s={1} md={2} className="g-4">
          {recipes.map((recipe, idx) => (
            <Col key={idx}>
              <Card style={styles.card}>
                <Row>
                  <Col sm={4}>
                    <Card.Img
                      src={recipe.recipe.image}
                      style={styles.cardImage}
                    />
                  </Col>
                  <Col sm={8}>
                    <Card.Title style={styles.cardTitle}>
                      {recipe.recipe.label}
                    </Card.Title>
                    <Card.Body
                      style={styles.cardBody}
                      className="recipe-scroller"
                    >
                      {recipe.recipe.dietLabels.map((label, i) => (
                        <ul key={i} style={styles.listItem}>
                          <li>{label}</li>
                        </ul>
                      ))}
                      {recipe.recipe.healthLabels.map((healthLabel, id) => (
                        <ul key={id} style={styles.listItem}>
                          <li>{healthLabel}</li>
                        </ul>
                      ))}
                    </Card.Body>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Card.Title className="card-calories">Calories</Card.Title>
                    {recipe.recipe.calories} <p className="calories-p">kCal</p>
                  </Col>
                  <Col sm={8}>
                    <Card.Title className="ingredient-size">Ingredients</Card.Title>
                    <Card.Body
                      style={styles.cardBody}
                      className="recipe-scroller"
                    >
                      {recipe.recipe.ingredients.map((ingredient, idx) => (
                        <ul key={idx} style={styles.listItem}>
                          <li>{ingredient.text}</li>
                        </ul>
                      ))}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Recipes;
