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
      </div>
   );
};

export default ClientLayout;
