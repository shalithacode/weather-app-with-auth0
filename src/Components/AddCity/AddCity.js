import "./AddCity.css";

function AddCity() {
  return (
    <div className="AddCity-container">
      <form>
        <input
          className="city-input-name"
          type="text"
          id="input-box"
          placeholder="Enter a city"
          name="name"
        />
        <button className="city-input-button" type="submit">
          Add City
        </button>
      </form>
    </div>
  );
}

export default AddCity;
