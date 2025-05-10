import React from "react";
import { LoginCli, LayoutCli, Home, ValidCode, CambioContra, Emailverify,AG,HN, NT, UZ} from '../components';
import { Routes, Route } from "react-router-dom";
import SessionManagerCli from "../utils/SessionManagerCli";
import Expiracontra from "../utils/expiraCode";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginCli />}/> */}
      <Route path="/" element={<LayoutCli><SessionManagerCli/><Home/></LayoutCli>} />
      <Route path="/verificaEmail" element={<Emailverify />}/>
      <Route path="/validaCodigo" element={<><Expiracontra /><ValidCode /></>}/>
      <Route path="/reset-password/:token" element={<CambioContra />}/>      
      <Route path="/Result" element={<LayoutCli><SessionManagerCli/><Home/></LayoutCli>} />  
      <Route path="PruebasAG" element={<LayoutCli><SessionManagerCli/><AG/></LayoutCli>} /> 
      <Route path="PruebasHN" element={<LayoutCli><SessionManagerCli/><HN/></LayoutCli>} />
      <Route path="PruebasNT" element={<LayoutCli><SessionManagerCli/><NT/></LayoutCli>} />  
      <Route path="PruebasUZ" element={<LayoutCli><SessionManagerCli/><UZ/></LayoutCli>} />    
    </Routes>
  );
};
