import { useEffect, useState } from "react";

export default function useAuthGuard() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function verificar() {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split(".")[1]));

                const resposta = await fetch(`http://localhost:3001/auth/${payload.id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                if (!resposta.ok) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    return;
                }

                setUsuario({
                    ...payload,
                    dados: await resposta.json()
                });

            } catch (error) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        verificar();
    }, []);

    return usuario;
}