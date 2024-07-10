import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div>
            <header>
                <NavbarAdmin/>
            </header>
            <div className="page-admin">
                <main>
                    <Outlet/>
                </main>
                <footer className="border-top mt-4">
                    <p className="text-center text-secondary py-4">&copy; Tsumego 2024</p>
                </footer>
            </div>

        </div>
    );
};

export default AdminLayout;
