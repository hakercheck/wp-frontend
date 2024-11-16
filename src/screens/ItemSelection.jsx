import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetAllItemsQuery } from "../slices/OrderApiSlice.js";
import { Button, Card, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function ItemSelection() {
  const { vendorID } = useParams();

  const {
    data: itemDisplays,
    isLoading,
    isError,
    error,
  } = useGetAllItemsQuery(vendorID);

  const [quantities, setQuantities] = useState({});
  const [budget, setBudget] = useState(0);
  const [totalCosts, setTotalCosts] = useState({});
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const categories = ["attire", "venue", "photography", "catering"];
    let isOverBudget = false;
    for (let category of categories) {
      if ((totalCosts[category] || 0) > budget) {
        setAlert(`You have exceeded your budget for ${category}`);
        isOverBudget = true;
        break;
      }
    }
    if (!isOverBudget) {
      setAlert("");
    }
  }, [totalCosts, budget]);

  return (
    <>
      <div className="d-flex mt-3 mb-2">
        {alert && <h3 className="text-danger ms-auto">{alert}</h3>}
        <Button variant="danger" className="ms-auto">
          Checkout →
        </Button>
      </div>
      <div style={{ overflow: "auto", maxHeight: "80vh" }}>
        <div className="d-flex mb-1 mt-3">
          <h3>Catering</h3>
          <input
            type="number"
            placeholder="Enter budget"
            className="ms-3 rounded"
            onChange={(e) => {
              const newBudget = e.target.value;
              setBudget(newBudget);
              if (newBudget < (totalCosts["catering"] || 0)) {
                setAlert("Your current selections exceed the new budget");
              } else {
                setAlert("");
              }
            }}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setAlert("")}
          >
            Enter
          </button>

          <h3 className="ms-auto">
            Cost for Catering: ${totalCosts["catering"] || 0}
          </h3>
        </div>
        {itemDisplays && itemDisplays.length > 0 && (
          <Carousel showDots={false} responsive={responsive}>
            {itemDisplays &&
              itemDisplays
                .filter((itemDisplay) => itemDisplay.category === "catering")
                .map((itemDisplay) => (
                  <Card
                    key={itemDisplay._id}
                    style={{
                      width: "18rem",
                      margin: "1rem",
                      height: "22rem",
                      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={itemDisplay.imageURL}
                      alt={itemDisplay.name}
                      style={{
                        width: "100%",
                        height: "12rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{itemDisplay.name}</Card.Title>
                      <div className="d-flex">
                        <Card.Text>Price: ${itemDisplay.price}</Card.Text>
                        <Card.Text className="ms-auto">
                          Quantity:{" "}
                          {itemDisplay.quantity -
                            (quantities[itemDisplay._id] || 0)}
                        </Card.Text>
                      </div>
                      <div className="d-flex">
                        <ButtonGroup
                          aria-label="Basic example"
                          className="border"
                        >
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity > 0) {
                                const newQuantity = currentQuantity - 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) -
                                  itemDisplay.price;
                                setQuantities({
                                  ...quantities,
                                  [itemDisplay._id]: newQuantity,
                                });
                                setTotalCosts({
                                  ...totalCosts,
                                  [itemDisplay.category]: newCost,
                                });
                              }
                            }}
                          >
                            -
                          </Button>
                          <Button variant="light">
                            {quantities[itemDisplay._id] || 0}
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity < itemDisplay.quantity) {
                                const newQuantity = currentQuantity + 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) +
                                  itemDisplay.price;
                                if (newCost > budget) {
                                  setAlert(
                                    `Adding this item will exceed your budget for ${itemDisplay.category}`
                                  );
                                } else {
                                  setQuantities({
                                    ...quantities,
                                    [itemDisplay._id]: newQuantity,
                                  });
                                  setTotalCosts({
                                    ...totalCosts,
                                    [itemDisplay.category]: newCost,
                                  });
                                }
                              }
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        <Button variant="success" className="ms-auto">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
          </Carousel>
        )}

        <div className="d-flex mb-1 mt-3">
          <h3>Photography</h3>
          <input
            type="number"
            placeholder="Enter budget"
            className="ms-3 rounded"
            onChange={(e) => {
              const newBudget = e.target.value;
              setBudget(newBudget);
              if (newBudget < (totalCosts["photography"] || 0)) {
                setAlert("Your current selections exceed the new budget");
              } else {
                setAlert("");
              }
            }}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setAlert("")}
          >
            Enter
          </button>

          <h3 className="ms-auto">
            Cost for Catering: ${totalCosts["photography"] || 0}
          </h3>
        </div>
        {itemDisplays && itemDisplays.length > 0 && (
          <Carousel showDots={false} responsive={responsive}>
            {itemDisplays &&
              itemDisplays
                .filter((itemDisplay) => itemDisplay.category === "photography")
                .map((itemDisplay) => (
                  <Card
                    key={itemDisplay._id}
                    style={{
                      width: "18rem",
                      margin: "1rem",
                      height: "22rem",
                      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={itemDisplay.imageURL}
                      alt={itemDisplay.name}
                      style={{
                        width: "100%",
                        height: "12rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{itemDisplay.name}</Card.Title>
                      <div className="d-flex">
                        <Card.Text>Price: ${itemDisplay.price}</Card.Text>
                        <Card.Text className="ms-auto">
                          Quantity:{" "}
                          {itemDisplay.quantity -
                            (quantities[itemDisplay._id] || 0)}
                        </Card.Text>
                      </div>
                      <div className="d-flex">
                        <ButtonGroup
                          aria-label="Basic example"
                          className="border"
                        >
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity > 0) {
                                const newQuantity = currentQuantity - 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) -
                                  itemDisplay.price;
                                setQuantities({
                                  ...quantities,
                                  [itemDisplay._id]: newQuantity,
                                });
                                setTotalCosts({
                                  ...totalCosts,
                                  [itemDisplay.category]: newCost,
                                });
                              }
                            }}
                          >
                            -
                          </Button>
                          <Button variant="light">
                            {quantities[itemDisplay._id] || 0}
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity < itemDisplay.quantity) {
                                const newQuantity = currentQuantity + 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) +
                                  itemDisplay.price;
                                if (newCost > budget) {
                                  setAlert(
                                    `Adding this item will exceed your budget for ${itemDisplay.category}`
                                  );
                                } else {
                                  setQuantities({
                                    ...quantities,
                                    [itemDisplay._id]: newQuantity,
                                  });
                                  setTotalCosts({
                                    ...totalCosts,
                                    [itemDisplay.category]: newCost,
                                  });
                                }
                              }
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        <Button variant="success" className="ms-auto">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
          </Carousel>
        )}

        <div className="d-flex mb-1 mt-3">
          <h3>Attire</h3>
          <input
            type="number"
            placeholder="Enter budget"
            className="ms-3 rounded"
            onChange={(e) => {
              const newBudget = e.target.value;
              setBudget(newBudget);
              if (newBudget < (totalCosts["attire"] || 0)) {
                setAlert("Your current selections exceed the new budget");
              } else {
                setAlert("");
              }
            }}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setAlert("")}
          >
            Enter
          </button>

          <h3 className="ms-auto">
            Cost for Catering: ${totalCosts["attire"] || 0}
          </h3>
        </div>
        {itemDisplays && itemDisplays.length > 0 && (
          <Carousel showDots={false} responsive={responsive}>
            {itemDisplays &&
              itemDisplays
                .filter((itemDisplay) => itemDisplay.category === "attire")
                .map((itemDisplay) => (
                  <Card
                    key={itemDisplay._id}
                    style={{
                      width: "18rem",
                      margin: "1rem",
                      height: "33rem",
                      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={itemDisplay.imageURL}
                      alt={itemDisplay.name}
                      style={{
                        width: "100%",
                        height: "23rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{itemDisplay.name}</Card.Title>
                      <div className="d-flex">
                        <Card.Text>Price: ${itemDisplay.price}</Card.Text>
                        <Card.Text className="ms-auto">
                          Quantity:{" "}
                          {itemDisplay.quantity -
                            (quantities[itemDisplay._id] || 0)}
                        </Card.Text>
                      </div>
                      <div className="d-flex">
                        <ButtonGroup
                          aria-label="Basic example"
                          className="border"
                        >
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity > 0) {
                                const newQuantity = currentQuantity - 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) -
                                  itemDisplay.price;
                                setQuantities({
                                  ...quantities,
                                  [itemDisplay._id]: newQuantity,
                                });
                                setTotalCosts({
                                  ...totalCosts,
                                  [itemDisplay.category]: newCost,
                                });
                              }
                            }}
                          >
                            -
                          </Button>
                          <Button variant="light">
                            {quantities[itemDisplay._id] || 0}
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity < itemDisplay.quantity) {
                                const newQuantity = currentQuantity + 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) +
                                  itemDisplay.price;
                                if (newCost > budget) {
                                  setAlert(
                                    `Adding this item will exceed your budget for ${itemDisplay.category}`
                                  );
                                } else {
                                  setQuantities({
                                    ...quantities,
                                    [itemDisplay._id]: newQuantity,
                                  });
                                  setTotalCosts({
                                    ...totalCosts,
                                    [itemDisplay.category]: newCost,
                                  });
                                }
                              }
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        <Button variant="success" className="ms-auto">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
          </Carousel>
        )}

        <div className="d-flex mb-1 mt-3">
          <h3>Venue</h3>
          <input
            type="number"
            placeholder="Enter budget"
            className="ms-3 rounded"
            onChange={(e) => {
              const newBudget = e.target.value;
              setBudget(newBudget);
              if (newBudget < (totalCosts["venue"] || 0)) {
                setAlert("Your current selections exceed the new budget");
              } else {
                setAlert("");
              }
            }}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setAlert("")}
          >
            Enter
          </button>

          <h3 className="ms-auto">
            Cost for Catering: ${totalCosts["venue"] || 0}
          </h3>
        </div>
        {itemDisplays && itemDisplays.length > 0 && (
          <Carousel showDots={false} responsive={responsive}>
            {itemDisplays &&
              itemDisplays
                .filter((itemDisplay) => itemDisplay.category === "venue")
                .map((itemDisplay) => (
                  <Card
                    key={itemDisplay._id}
                    style={{
                      width: "18rem",
                      margin: "1rem",
                      height: "22rem",
                      boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={itemDisplay.imageURL}
                      alt={itemDisplay.name}
                      style={{
                        width: "100%",
                        height: "12rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{itemDisplay.name}</Card.Title>
                      <div className="d-flex">
                        <Card.Text>Price: ${itemDisplay.price}</Card.Text>
                        <Card.Text className="ms-auto">
                          Quantity:{" "}
                          {itemDisplay.quantity -
                            (quantities[itemDisplay._id] || 0)}
                        </Card.Text>
                      </div>
                      <div className="d-flex">
                        <ButtonGroup
                          aria-label="Basic example"
                          className="border"
                        >
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity > 0) {
                                const newQuantity = currentQuantity - 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) -
                                  itemDisplay.price;
                                setQuantities({
                                  ...quantities,
                                  [itemDisplay._id]: newQuantity,
                                });
                                setTotalCosts({
                                  ...totalCosts,
                                  [itemDisplay.category]: newCost,
                                });
                              }
                            }}
                          >
                            -
                          </Button>
                          <Button variant="light">
                            {quantities[itemDisplay._id] || 0}
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => {
                              const currentQuantity =
                                quantities[itemDisplay._id] || 0;
                              if (currentQuantity < itemDisplay.quantity) {
                                const newQuantity = currentQuantity + 1;
                                const newCost =
                                  (totalCosts[itemDisplay.category] || 0) +
                                  itemDisplay.price;
                                if (newCost > budget) {
                                  setAlert(
                                    `Adding this item will exceed your budget for ${itemDisplay.category}`
                                  );
                                } else {
                                  setQuantities({
                                    ...quantities,
                                    [itemDisplay._id]: newQuantity,
                                  });
                                  setTotalCosts({
                                    ...totalCosts,
                                    [itemDisplay.category]: newCost,
                                  });
                                }
                              }
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                        <Button variant="success" className="ms-auto">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default ItemSelection;
