import "../css/UserProfile.css";
import { FaUserLarge } from "react-icons/fa6";

export default function UserProfile() {
  return (
    <div className="user-profile-container">
      <FaUserLarge className="icono-usuario"/>
      <p className="datos-usuario" style={{marginTop: "50px"}}>Nombre: </p>
      <p className="datos-usuario">Email: </p>
      <p className="datos-usuario">Dirección: </p>
    </div>
  )
}