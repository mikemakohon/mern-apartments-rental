import { Button } from "../common/Button";
import { StyledContainer } from "./styled";

export const ApartmentCard = ({ apartment, deleteApartment }) => {
  const handleDelete = () => {
    deleteApartment(apartment._id);
  };

  return (
    <StyledContainer>
      <div>
        <p>
          {apartment.name} / {apartment.rooms} rooms / {apartment.price} $
        </p>
        <p>{apartment.description}</p>
      </div>
      <Button title="Delete" bgColor="#ff4040" handleClick={handleDelete} />
    </StyledContainer>
  );
};
