import React, { useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./countryPicker.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountriesAsync } from "../../Redux/fetchData";
import { changeCountry } from "../../Redux/covidSlice";


export function CountryPicker() {
    const countries = useSelector(state => state.covid.countries);

    const dispatch = useDispatch();

    useEffect(() => {
        const url = "https://covid19.mathdro.id/api/countries";
        dispatch(getCountriesAsync(url));

    }, [dispatch]);

    if(!countries){
        return(
            <div>Loading...</div>
        )
    }
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect
                defaultValue=""
                onChange={(e) => dispatch(changeCountry(e.target.value))}
            >
                <option value="">Global</option>
                {countries.map((country, key) => (
                    <option key={key} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>

    );
}

