import React, { useState, useEffect } from "react";
import Naksha from "../Maps/Naksha";
import { decode } from "@googlemaps/polyline-codec";
// import axios from 'axios';S
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./main.css";

const Main = () => {
  const [showTollDetails, setShowTollDetails] = useState(false);
  const getRandomValue = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const tollDetails = {
    totalPetrolCost: getRandomValue(),
    totalDistance: getRandomValue(),
    cheapestRoute: `Route ${getRandomValue()}`,
    costliestRoute: `Route ${getRandomValue()}`,
    tollFees: getRandomValue(),
    fuelCost: getRandomValue(),
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [routePolyline, setRoutePolyline] = useState(null);
  const [tollMarkers, setTollMarkers] = useState([]);

  const calculateToll = async () => {
    setTimeout(() => {
      // Toggle the visibility of toll details
      setShowTollDetails(true);
    }, 1000);

    setTimeout(() => {
      // Toggle the visibility of toll details
      setShowTollDetails(false);
    }, 10000);
    try {
      // Replace 'YOUR_API_KEY' with your actual API key from TollGuru
      const apiKey = "nbf7HLmrjQLG6NFG9hh77H9qLQfTqNhR";

      // Specify TollGuru API endpoint and parameters
      const forward = `https://api.opencagedata.com/geocode/v1/json?q=${startPoint}&key=0ddaf52b391d4d29a5558f8b706a19e3`;
      const reverse = `https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=0ddaf52b391d4d29a5558f8b706a19e3


        `;
      // Prepare request payload (adjust based on TollGuru API documentation)
      const requestData = {
        from: {
          lat: 39.95209,
          lng: -75.16219,
        },
        to: {
          lat: 40.71455,
          lng: -74.00715,
        },
        vehicle: {
          type: "2AxlesTruck",
          weight: {
            value: 20000,
            unit: "pound",
          },
        },
      };
     
        const res = await fetch(forward);
        const ress = await res.json();
      console.log(ress.results[1].geometry.lat);
      console.log(ress.results[1].geometry.lng);
      setStartPoint(ress.results[1].geometry.lat)
      setEndPoint(ress.results[1].geometry.lng)
      


      const output = await fetch(
        `https://apis.tollguru.com/toll/v2/origin-destination-waypoints/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            "X-Api-Key": "nbf7HLmrjQLG6NFG9hh77H9qLQfTqNhR",
            // Include any other headers required by the TollGuru API
          },
          body: JSON.stringify(requestData),
          mode: "cors",
        }
      );

      const data = await output.json();
      console.log(data);

      //   nbf7HLmrjQLG6NFG9hh77H9qLQfTqNhR
      // Make a POST request to TollGuru API

      // Handle the data received from the API
      // Extract polyline or toll details as needed
    } catch (error) {
      console.error("Error fetching data from TollGuru API:", error.message);
      // Handle errors appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <div className="maincontainer">
      <div className="description">
        <p>
          The Toll Calculator app is your go-to tool for planning seamless
          journeys and estimating toll expenses with precision. Whether you're a
          daily commuter, a road trip enthusiast, or a logistics professional,
          this app provides a user-friendly experience to simplify toll
          calculations and enhance your travel planning.
        </p>
      </div>

      <div className="container2">
        <div className="secondfirst">
          <div className="starting">
            <label htmlFor="">Enter Start Point</label>
            <input
              type="text"
              placeholder="enter location"
              value={startPoint}

              
              onChange={(e) => setStartPoint(e.target.value) }
              
            />
          </div>
          <div className="starting">
            <label htmlFor="">Enter End Point</label>
            <input
            
              type="text"
              placeholder="enter location"
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
            />
          </div>
          <div className="starting">
            <label htmlFor="">Choose Vehicle Type</label>
            <select
            
              name="Vehicles"
              id="Vehicle"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="car">car/jeep/van</option>
              <option value="Taxi">Taxi</option>
              <option value="Bike">Bike</option>
              <option value="Vehicle">Pickup truck , commercial vehicle</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
              <option value="HCM">HCM , EME</option>
            </select>
          </div>
          <div className="starting">
            <label htmlFor="datePicker">Select Date:</label>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showPopperArrow={false}
            />
          </div>
          <div className="starting">
            <button onClick={calculateToll}>Calculate Toll</button>
          </div>
        </div>
        <div className="secondsecond">
          <Naksha markers={tollMarkers} />
        </div>
      </div>
      {showTollDetails && (<div className="toll-details">
        <h2>Trip Details</h2>
        <div className="starting">
          <p>Latitude:</p>
          <span>{startPoint}</span>
        </div>
        <div className="starting">
          <p>longitude :</p>
          <span>{endPoint}</span>
        </div>

        <div className="starting">
          <p>Total Distance:</p>
          <span>{tollDetails.totalDistance} km</span>
        </div>
        <div className="starting">
          <p>Cheapest Route:</p>
          <span>{tollDetails.cheapestRoute}</span>
        </div>
        <div className="starting">
          <p>Costliest Route:</p>
          <span>{tollDetails.costliestRoute}</span>
        </div>
        <div className="starting">
          <p>Toll Fees:</p>
          <span>${tollDetails.tollFees}</span>
        </div>
        <div className="starting">
          <p>Fuel Cost:</p>
          <span>${tollDetails.fuelCost}</span>
        </div>
      </div>)}
    </div>
  );
};

export default Main;
