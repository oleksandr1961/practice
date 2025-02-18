import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationForm({ onRegister }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPhoneConfirmed, setIsPhoneConfirmed] = useState(false);
  const [code, setCode] = useState("");

  const confirmPhone = () => {
    if (code === "1234") {
      setIsPhoneConfirmed(true);
      alert("Номер телефону підтверджено!");
    } else {
      alert("Невірний код! Спробуйте ще раз.");
    }
  };

  const onSubmit = (data) => {
    if (!isPhoneConfirmed) {
      alert("Підтвердіть номер телефону перед реєстрацією!");
      return;
    }
    console.log("Реєстраційні дані:", data);
    onRegister();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>Реєстрація</h2>

      <input type="tel" {...register("phone", { required: "Введіть номер телефону" })} placeholder="Телефон" disabled={isPhoneConfirmed} />
      {errors.phone && <p style={styles.error}>{errors.phone.message}</p>}

      {!isPhoneConfirmed && (
        <>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Код підтвердження" />
          <button type="button" onClick={confirmPhone}>Підтвердити</button>
        </>
      )}

      <input type="email" {...register("email", { required: "Введіть email" })} placeholder="Email" />
      {errors.email && <p style={styles.error}>{errors.email.message}</p>}

      <input type="password" {...register("password", { required: "Введіть пароль", minLength: { value: 6, message: "Мінімум 6 символів" } })} placeholder="Пароль" />
      {errors.password && <p style={styles.error}>{errors.password.message}</p>}

      <button type="submit" disabled={!isPhoneConfirmed}>Зареєструватися</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" },
  error: { color: "red" }
};
