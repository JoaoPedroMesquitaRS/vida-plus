import { useEffect, useState } from "react";

export default function Profisionais({ localId }){

    const [ profissionais, setProfissionais ] = useState([]);

    useEffect(() => {
        if (localId) {
            fetch(`http://localhost:3001/locais-atendimento/profissional/${localId}`)
                .then((res) => res.json())
                .then((data) => {
                    setProfissionais((prev) => ({
                    ...prev,
                    [localId]: data.profissionais || []  // 👈 pega apenas o array
                    }));
                })
                .catch((err) => console.error("Erro ao carregar profissionais:", err));
        }
    }, [localId])

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Profissionais do Local
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                {(profissionais[localId] || []).map((prof) => (
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">
                            {prof.nome}
                        </span>
                        <span className="text-sm text-gray-700">
                            {prof.especialidade}
                        </span>
                        <span className="text-sm text-gray-700">
                            {prof.registro}
                        </span>
                        <button className="text-blue-600 text-sm hover:underline">
                            Remover
                        </button>
                    </div>
                ))}                    
            </div>
        </div>
    )
}