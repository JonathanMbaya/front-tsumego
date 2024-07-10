import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
   return (
      <div>
         <header>
            <Navbar />
         </header>
         <main>
            <Outlet />
         </main>
         <footer className="border-top mt-4">
            <p className="text-center py-4">&copy; Tsumego 2024</p>
         </footer>
      </div>
   );
};

export default ClientLayout;
