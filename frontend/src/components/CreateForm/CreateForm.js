import { useState } from "react";
import { Button } from "../common/Button";
import { StyledForm, StyledFormContainer, StyledInput } from "./styled";

export const CreateForm = ({ fetchApartments }) => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apartment = { name, rooms, price, description };

    const response = await fetch("/apartments", {
      method: "POST",
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setName("");
      setRooms("");
      setPrice("");
      setDescription("");
      setError(null);
      fetchApartments();

      console.log("new apartment added");
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormContainer>
          <div>
            <label htmlFor="name">Name</label>
            <StyledInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
            />
          </div>
          <div>
            <label htmlFor="rooms">Rooms</label>
            <StyledInput
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              type="number"
              id="rooms"
            />
          </div>
          <div>
            <label htmlFor="price">Price (in $)</label>
            <StyledInput
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <StyledInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="description"
            />
          </div>
        </StyledFormContainer>
        <Button title="Submit" bgColor="#23BA99" />
      </StyledForm>
      {error && <h3>{error}</h3>}
    </>
  );
};
