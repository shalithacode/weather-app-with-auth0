import "./Card.css";
import { Link } from "react-router-dom";
const formatedDT = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${hours % 12 || 12}.${minutes < 10 ? "0" : ""}${minutes}${
    hours >= 12 ? "pm" : "am"
  }, ${month} ${day}`;
};
function Card(props) {
  const crossIconHandler = () => {
    props.onCloseHandler(props.citiData.id);
  };
  return (
    <div id="cards">
      <img
        className="cross_icon"
        src="./cross_icon.png"
        alt="cross_icon"
        onClick={crossIconHandler}
      />
      <Link
        to="/cardDetails"
        state={{
          id: props.citiData.id,
          backgroundColorId: props.id,
        }}
      >
        <div className="card">
          <img
            className={`background--${props.id}`}
            src="./cloud.png"
            alt="Cloud-Img"
          />

          <div className="card-img-overlay">
            <div className="row">
              <div className="col-6 b-r align-self-center">
                <div className="card-title text-white m-b-0 dl">
                  <h3 className="city">{props.citiData.name}</h3>
                  <p className="dt">{formatedDT(props.citiData.dt)}</p>
                  <img align="top" src="" alt="" className="ic" />
                </div>

                <small className="card-text text-white ">
                  <p className="desc">{props.citiData.description}</p>
                </small>
              </div>

              <div className="col-5 b-r text-center">
                <div className="card-title  text-white m-b-0 dl">
                  <h3 className="temp">{props.citiData.temp}°C</h3>
                  <br />
                </div>
                <p className="text-right">
                  Temp Min: {props.citiData.temp_min}°C
                </p>
                <p className="text-right ">
                  Temp Max: {props.citiData.temp_max}°C
                </p>
                <div className="m-l-20"></div>
              </div>
            </div>
          </div>
          <div className="card-body weather-small">
            <div className="row">
              <div className="col-4 b-r divider align-self-center">
                <div className="d-flex">
                  <div className="m-l-20">
                    <p className="id">
                      Pressure: <span>{props.citiData.pressure}hpa</span>
                    </p>
                    <p className="id">
                      Humidity: <span>{props.citiData.humidity}%</span>
                    </p>
                    <p className="id">
                      Visibility: <span>{props.citiData.visibility}km</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-3 b-r divider text-center">
                <div className="m-l-20">
                  <img src="./send.png" alt="send-icon" className="Send-img" />
                  <p className="id wind-text">
                    {props.citiData.speed} m/s {props.citiData.deg} Degree
                  </p>
                </div>
              </div>
              <div className="col-4 b-r divider align-self-center min-padding">
                <div className="d-flex">
                  <div className="m-l-20">
                    <p className="id">
                      {" "}
                      Sunrise:{" "}
                      <span>
                        {new Date(props.citiData.sunrise * 1000).toLocaleString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </span>
                    </p>
                    <p className="id">
                      {" "}
                      Sunset:{" "}
                      <span>
                        {new Date(props.citiData.sunset * 1000).toLocaleString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
