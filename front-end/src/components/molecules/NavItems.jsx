import NavLink from "react-bootstrap/esm/NavLink"

const NavItems = ({label, href}) =>{
    return (
        <li>
            <NavLink href={href}>{label}</NavLink>
        </li>
    )
}

export default NavItems;