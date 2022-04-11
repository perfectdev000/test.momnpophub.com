import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["address"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () => {
    handlePlaceSelect(updateQuery);
  });
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject;
  updateQuery(query);
}

function LocationAutoComplete({
  name,
  form,
  errors,
  placeholder = "Enter your address",
  getCoordinates = () => {},
  ...props
}) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (typeof query !== "string") {
      form.setValue(name, query.formatted_address);
      getCoordinates({lat: query.geometry.location.lat(), long: query.geometry.location.lng()})
    } else {
      form.setValue(name, query);
    }
  }, [query]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqh-KbjRRhjiP0wK3CNDPbgR5hIx8bBHc&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <>
      <Form.Control
        autoComplete="chrome-off"
        className="input shadow-none"
        ref={autoCompleteRef}
        onChange={(event) => {
          setQuery(event.target.value);
          form.trigger(name);
        }}
        placeholder={placeholder}
        value={query.formatted_address}
        {...props}
      />
      {/*errors[name] && ( //KACKEY--------
        <p style={{ color: "red" }}>Bussiness address is required</p>
      )*/}
    </>
  );
}

export default LocationAutoComplete;
