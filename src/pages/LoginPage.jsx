import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const req = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const res = await req.json();

        if (req.ok) {
            localStorage.setItem("token", res.token);
            window.location.href = "/home";
        } else {
            setErro(res.error || "Erro ao fazer login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form 
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-lg w-80"
            >
                <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

                <input 
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />

                {erro && <p className="text-red-600 text-sm">{erro}</p>}

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Entrar
                </button>
            </form>
        </div>
    );
}