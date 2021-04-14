import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "./context";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";

const ModalNewSpot = () => {
  const {
    isNewSpotOpen,
    closeNewSpot,
    newSpotLong,
    newSpotLat,
    modalMsg,
  } = useGlobalContext();
  const refName = useRef(null);
  const refCountry = useRef(null);
  const refProb = useRef(null);
  const refSeason = useRef(null);

  const addSpot = async (e) => {
    e.preventDefault();
    try {
      if (!refName.current.value) {
        modalMsg("Spot name is required!", "error");
      }
      if (!refCountry.current.value) {
        modalMsg("Country name is required!", "error");
      }
      if (!refProb.current.value) {
        modalMsg("Wind probability is required!", "error");
      }
      if (!refSeason.current.value) {
        modalMsg("Season is required!", "error");
      } else {
        const res = await fetch(spotsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdAt: new Date(),
            name: refName.current.value,
            country: refCountry.current.value,
            lat: newSpotLat.toFixed(4).toString(),
            long: newSpotLong.toFixed(4).toString(),
            probability: parseInt(refProb.current.value),
            month: refSeason.current.value,
          }),
        });
        if (res.ok) {
          // const data = await res.json();
          modalMsg("The new spot has been successfully added!", "info");
          closeNewSpot();
        } else {
          modalMsg("There are too many spots already added.", "error");
          closeNewSpot();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      className={`${
        isNewSpotOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <form className="modal-flex">
          <label htmlFor="name" className="label-modal-add">
            Name
          </label>
          <input
            className="login-input"
            type="text"
            id="name"
            required={true}
            ref={refName}
          />
          <label htmlFor="country" className="label-modal-add">
            Country
          </label>
          <input
            className="login-input"
            type="text"
            id="country"
            required={true}
            ref={refCountry}
          />
          <label htmlFor="prob" className="label-modal-add">
            Wind prob.
          </label>
          <input
            className="login-input"
            type="text"
            id="prob"
            required={true}
            ref={refProb}
          />
          <label htmlFor="season" className="label-modal-add">
            Season
          </label>
          <select className="login-input" name="" id="season" ref={refSeason}>
            <option value="">Select a month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <label htmlFor="long" className="label-modal-add">
            Latitude
          </label>
          <input
            id="long"
            className="login-input"
            type="text"
            value={newSpotLong ? newSpotLong.toFixed(4) : 0}
            readOnly
          />
          <label htmlFor="lat" className="label-modal-add">
            Latitude
          </label>
          <input
            id="lat"
            className="login-input"
            type="text"
            value={newSpotLat ? newSpotLat.toFixed(4) : 0}
            readOnly
          />
          <button className="login-btn" onClick={addSpot}>
            Add Spot
          </button>
        </form>
        <button className="close-modal-btn" onClick={closeNewSpot}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ModalNewSpot;
