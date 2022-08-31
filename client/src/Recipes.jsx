import React, { useEffect, useState } from "react";
import { Card, Button, InputGroup, ListGroupItem } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "./Recipes.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";

const Recipes = () => {
  const [query, setQuery] = useState("pasta");
  const [recipes, setRecipes] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getRecipes();
    console.log(recipes);
  }, [query]);

  const getNewRecipes = async (starting, ending) => {
    setIsLoading(true);
    const res = await fetch(
      `http://localhost:5000/api/recipes/v2/${query}&from=${starting}&to=${ending}`
    );
    const data = await res.json();
    setIsLoading(false);
    return data;
  };

  const handlePageClick = async (data) => {
    let start = 11;
    let end = 21;

    const newRecipes = await getNewRecipes(start, end);
    setRecipes(newRecipes.hits);
  };

  let url = ``;
  //fetch new data for pagination
  const getNextPage = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/api/recipes/${query}`);
    const data = await response.json();
    url = data;
    setIsLoading(false);
  };

  //fetch recipe data
  const getRecipes = async () => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:5000/api/recipes/v2/${query}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setIsLoading(false);
  };

  //fetch based on query
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.recipeQuery.value);
    getRecipes();
  };

  //check session user
  axios.get("http://localhost:5000/login").then((response) => {
    if (response.data.loggedIn === true) {
      setLoginStatus(response.data.user[0].username);
    }
  });

  const styles = {
    cardBody: {
      height: "200px",
      overflow: "auto",
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
          {recipes
            ? recipes.map((recipe, idx) => (
                <Col key={idx}>
                  <Card style={styles.card}>
                    <Row>
                      <Col sm={4}>
                        <Card.Img
                          src={recipe.recipe.image}
                          className="recipe-img-thumb"
                        />
                      </Col>
                      <Col sm={8}>
                        <Card.Title className="cardTitle">
                          {recipe.recipe.label}
                        </Card.Title>
                        <Card.Body
                          style={styles.cardBody}
                          className="recipe-scroller"
                        >
                          {recipe.recipe.dietLabels.map((label, i) => (
                            <ListGroup horizontal key={i}>
                              <ListGroup.Item>{label}</ListGroup.Item>
                            </ListGroup>
                          ))}
                          {recipe.recipe.healthLabels.map((healthLabel, id) => (
                            <ListGroup horizontal key={id}>
                              <ListGroup.Item>{healthLabel}</ListGroup.Item>
                            </ListGroup>
                          ))}
                        </Card.Body>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <p className="calories-l">Calories</p>
                        <p className="calories-p">
                          {Math.round(recipe.recipe.calories)} kCal
                        </p>
                        <p className="calories-l">Total Weight</p>
                        <p className="calories-p">
                          {Math.round(recipe.recipe.totalWeight)} g
                        </p>
                        <p className="calories-l">Servings</p>
                        <p className="calories-p">{recipe.recipe.yield}</p>
                      </Col>
                      <Col sm={6}>
                        <p className="calories-l">
                          {recipe.recipe.totalNutrients.CHOCDF.label}
                        </p>
                        <p className="calories-p">
                          {Math.round(
                            recipe.recipe.totalNutrients.CHOCDF.quantity
                          )}{" "}
                          g
                        </p>
                        <p className="calories-l">
                          {recipe.recipe.totalNutrients.FAT.label}
                        </p>
                        <p className="calories-p">
                          {Math.round(
                            recipe.recipe.totalNutrients.FAT.quantity
                          )}{" "}
                          g
                        </p>
                        <p className="calories-l">
                          {recipe.recipe.totalNutrients.PROCNT.label}
                        </p>
                        <p className="calories-p">
                          {Math.round(
                            recipe.recipe.totalNutrients.PROCNT.quantity
                          )}{" "}
                          g
                        </p>
                      </Col>
                      <Col sm={2}>
                        <Button
                          variant="outline-info"
                          onClick={() =>
                            navigate(`/recipes/${recipe.recipe.uri.slice(51)}`)
                          }
                        >
                          Details
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            : "Loading..."}
        </Row>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Recipes;
