import "./login.css";
import logo from "../../content/images/Frame.png"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import Api from "../../Services/api";

function App() {
  const [userCode, setUserCode] = useState("");

  const navigate = useNavigate();

  async function makeLogin(e) {
    e.preventDefault();
    
      await Api.get(`users/${userCode}`)
      .then((res) => {
        if (res.data && res.data.length !== 0) {
          navigate("/home", {state: {data: res.data}});
        } else {
          alert("Por favor insira um código válido")
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">

      <img src={logo} className='logo' />

      <div>
        <form className='login-container' onSubmit={makeLogin}>
          <input 
              className='login-input' 
              placeholder='Código do Usuário' 
              type='text' 
              required 
              onChange={(e) => setUserCode(e.target.value)}
            />

          <button className='login-button'>ENTRAR</button>
        </form>
      </div>

    </div>
  );
}

export default App;
