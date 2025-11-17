import React, { useState } from "react";

export default function SolicitarExameCard({ atendimentoCriado }) {
    const [ categoriaSelecionada, setCategoriaSelecionada ] = useState("");

    async function solicitarExame(categoria) {
        const response = await fetch('http://localhost:3001/exames', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                categoria: categoria,
                idPaciente: atendimentoCriado.idPaciente,
                idAtendimento: atendimentoCriado.id
            })
        });
        return response;
    }

    // useEffect(() => {
    //     console.log(atendimentoCriado);
    // });

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Solicitar Exame
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="categoriaExame"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Categoria do exame
                </label>
                <select
                    id="categoriaExame"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="RX">Raio X</option>
                    <option value="US">Ultrassonografia</option>
                    <option value="RM">Ressonância Magnética</option>
                    <option value="TC">Tomografia Computadorizada</option>
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        onClick={async () => {
                        const categoria = categoriaSelecionada
                        await solicitarExame(categoria);
                    }}
                >
                    Solicitar
                </button>
            </div>
        </div>
    );
}