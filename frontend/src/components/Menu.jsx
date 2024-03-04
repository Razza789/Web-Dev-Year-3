import React from 'react';
import { Link } from 'react-router-dom';
 
/**
 * Main menu
 * 
 * This will be the main navigation component in 
 * the app, with links to all main pages
 * 
 * @author Ryan Field
 */

function Menu() {
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Content", path: "/content" },
        { name: "Countries", path: "/countries" },
    ];

    const menuJSX = menuItems.map((item, i) => (
        <li key={i} className="py-2 px-8 hover:bg-blue-500">
            <Link to={item.path}>{item.name}</Link> {/* Use Link component for navigation */}
        </li>
    ));

    return (
        <div className="bg-blue-800 text-white">
            <ul className="flex flex-col md:flex-row justify-evenly">
                {menuJSX}
            </ul>
        </div>
    );
}

export default Menu;
 