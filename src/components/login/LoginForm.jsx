import { useId, useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const nameId = useId();
  const pwId = useId();
  const [isPassworVisible, setIsPassworVisible] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("antes");
    if (!formData.email || !formData.password) return;
    // console.log(",despues");
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={nameId}>EMAIL</label>
      </div>
      <input
        type="email"
        value={formData.email}
        onChange={handleOnChange}
        id={nameId}
        name="email"
        required
      />

      <div>
        <label htmlFor={pwId}>PW</label>
      </div>
      <input
        type={isPassworVisible ? "text" : "password"}
        value={formData.password}
        onChange={handleOnChange}
        id={pwId}
        name="password"
        required
      />
      <button
        type="button"
        onClick={() => setIsPassworVisible(!isPassworVisible)}
      >
        <i className="bx bx-low-vision"></i>
      </button>
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default LoginForm;
