import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './nav.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Nav() {
	const auth = useContext(AuthContext);

  const logOut = () => {
    
  }

  return (
    <Sidebar>
        <Menu>
            <MenuItem component={<Link to="/" />}> Home </MenuItem>
            {auth.isLoggedIn && <MenuItem component={<Link to="/products" />}> Products </MenuItem>}
            {/* <SubMenu label="Charts">
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
            </SubMenu> */}
            {auth.isLoggedIn && <MenuItem><button onClick={auth.logout}>Logout</button></MenuItem>}
        </Menu>
    </Sidebar>
  )
}
