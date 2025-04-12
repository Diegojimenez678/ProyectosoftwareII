import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LayoutCli.css';
import { deactivateSessionCli } from '../../service/Login_cli';

export default function LayoutCli(props) {    
    const [isReadyForInstall, setIsReadyForInstall] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        

        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            console.log("👍", "beforeinstallprompt", event);
            window.deferredPrompt = event;
            setIsReadyForInstall(true);
        });

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", () => { });
        };
    }, []);

    async function downloadApp() {
        console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            console.log("oops, no prompt event guardado en window");
            return;
        }
        promptEvent.prompt();
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        window.deferredPrompt = null;
        setIsReadyForInstall(false);
    }
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/");
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
        const userId = localStorage.getItem('usu_id');
        if (!userId) {
          console.error('No se pudo obtener el ID del usuario desde el almacenamiento local.');
          return;
        }
      
        try {
          setIsLoading(true); 
          await deactivateSessionCli(userId);
          setIsLoggedIn(false);
          navigate("/");
        } catch (error) {
          console.error('Error al intentar cerrar sesión:', error.message);    
        }finally{
            setIsLoading(false); 
        }
      };

    return (
        <div className="App">

            <header className="headerLayout">
                <h1>PWA</h1>

                {isReadyForInstall && (
                    <button className="buttonLayout" onClick={downloadApp}> Descargar APP</button>
                )}

                {isLoggedIn ? (
                    <button className="loginButton" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M0 0h24v24H0z" stroke="none" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" />
                            <path d="M16 19h6" />
                        </svg>
                    </button>
                ) : (
                    <button className="loginButton" onClick={handleLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M0 0h24v24H0z" stroke="none" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M16 19h6" />
                            <path d="M19 16v6" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                        </svg>
                    </button>
                )}

            </header>         
            {props.children}

            <footer className="footerLayout">
                <div className="footerContent">                    
                    <p>¡Gracias por visitarnos!</p>                    
                    
                </div>
            </footer>
            {isLoading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
        </div>
    );
}
