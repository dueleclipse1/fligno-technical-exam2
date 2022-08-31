import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./Details.css";

const Details = () => {
  const [recipeDetails, setRecipeDetails] = useState();
  const { recipeId } = useParams();
  const navigate = useNavigate();

  //render recipe
  useEffect(() => {
    getRecipe();
  }, [recipeId]);

  //render recipe method
  const getRecipe = async () => {
    const response = await fetch(`http://localhost:5000/recipes/${recipeId}`);
    const data = await response.json();
    if (data) {
      setRecipeDetails(data.recipe);
    }
  };
  return (
    <>
      <div className="container">
        <Button
          variant="secondary"
          className="justify-content-right"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Card
          className="container justify-content-center"
          style={{ width: "30rem" }}
        >
          <Card.Img
            variant="top"
            src={
              recipeDetails ? (
                recipeDetails?.image
              ) : (
                <Spinner animation="border" />
              )
            }
            alt="Card image"
          />
          <Card.Title>
            {recipeDetails ? (
              recipeDetails.label
            ) : (
              <Spinner animation="border" />
            )}
          </Card.Title>
          <Card.Body>
            <p>Ingredients: </p>
            {recipeDetails
              ? recipeDetails.ingredientLines.map((ingredient, idx) => (
                  <ListGroup horizontal key={idx}>
                    <ListGroup.Item>{ingredient}</ListGroup.Item>
                  </ListGroup>
                ))
              : "loading"}
          </Card.Body>
          <ListGroup horizontal>
            <ListGroup.Item className="li-detail">
              {recipeDetails ? (
                recipeDetails.cuisineType
              ) : (
                <Spinner animation="border" />
              )}
            </ListGroup.Item>
            <ListGroup.Item className="li-detail">
              {recipeDetails ? (
                recipeDetails.mealType
              ) : (
                <Spinner animation="border" />
              )}
            </ListGroup.Item>
            <ListGroup.Item className="li-detail">
              {recipeDetails ? (
                recipeDetails.dishType
              ) : (
                <Spinner animation="border" />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Details;
