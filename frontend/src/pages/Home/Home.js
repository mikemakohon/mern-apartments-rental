import { useState, useEffect } from "react";
import { ApartmentCard } from "../../components/ApartmentCard/ApartmentCard";
import { CreateForm } from "../../components/CreateForm/CreateForm";
import { StyledControlsContainer } from "./styled";
import { StyledInput } from "../../components/CreateForm/styled";

export const Home = () => {
  const [apartments, setApartments] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchApartments = async () => {
    let params = new URLSearchParams({
      search: searchValue,
      sort: selectValue,
    });

    const url = `/apartments?${params.toString()}`;

    const response = await fetch(url);
    const json = await response.json();

    if (response.ok) {
      setApartments(json);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [searchValue, selectValue]);

  const deleteApartment = async (id) => {
    const response = await fetch("/apartments/" + id, { method: "DELETE" });

    if (response.ok) {
      fetchApartments();
    }
  };

  return (
    <div>
      <h3>🤑 Create a new rent</h3>
      <CreateForm fetchApartments={fetchApartments} />
      <StyledControlsContainer>
        <h3> 🏡 Available Apartments ({apartments && apartments?.length})</h3>
        <div>
          <label htmlFor="rooms">Rooms:</label>
          <StyledInput
            id="rooms"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="number"
          />
        </div>
        <div>
          Sort by:{" "}
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="asc">Price: Lowest First</option>
            <option value="desc">Price: Highest First</option>
          </select>
        </div>
      </StyledControlsContainer>
      {apartments &&
        apartments.map((apartment) => (
          <ApartmentCard
            key={apartment._id}
            apartment={apartment}
            deleteApartment={deleteApartment}
          />
        ))}
    </div>
  );
};
