import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import ProfileInfoForm from "./ProfileInfoForm";

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div style={styles.container}>
      <h1>{isRegistered ? "Profile Info" : "Register"}</h1>
      {isRegistered ? <ProfileInfoForm /> : <RegistrationForm onRegister={() => setIsRegistered(true)} />}
    </div>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "auto", padding: "20px" }
};
