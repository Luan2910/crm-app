import { Outlet } from "react-router-dom";
import Nav from "./share/components/navigation/Nav";

export default function Layout() {
  return (
    <div style={{display: 'flex', gap: '2rem'}}>
        <Nav/>
        <Outlet/>
    </div>
  )
}
