import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ProfileInfoForm() {
  const { register, handleSubmit, watch } = useForm();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = watch("country");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data.map(c => c.name.common));
      })
      .catch(error => console.error("Помилка завантаження країн:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country: selectedCountry })
        .then(response => setCities(response.data.data))
        .catch(error => console.error("Помилка завантаження міст:", error));
    }
  }, [selectedCountry]);

  const onSubmit = (data) => {
    console.log("Дані профілю:", data);
    alert("Дані збережено!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>Profile Info</h2>

      <select {...register("country")}>
        <option value="">Виберіть країну</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>

      <select {...register("city")}>
        <option value="">Виберіть місто</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>

      <input type="text" {...register("name")} placeholder="Ім'я" required />
      <input type="text" {...register("surname")} placeholder="Прізвище" required />

      <button type="submit">Зберегти</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }
};
