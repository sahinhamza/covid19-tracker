import React from "react";
import { Cards } from "./Components/Cards/cards.js";
import { CountryPicker } from "./Components/CountryPicker/countryPicker.js";
import { Chart } from "./Components/Chart/chart.js";
import Footer from "./Components/Footer/footer.js";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="image.png" alt="COVID-19" />
      <br />
      <p>
        <b>Global and Country Wise Cases of Corona Virus</b>
      </p>
      <br />
      <p>
        <i>(For a Particular country, select a Country from below)</i>
      </p>
      <br />
      <br />
      <Cards />
      <CountryPicker />
      <Chart />
      <Footer />
    </div>

  );
}

export default App;
