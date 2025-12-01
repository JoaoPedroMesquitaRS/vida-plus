import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ModalHistoricoAtendimentos({ onClose, paciente }) {

    const [ atendimentos, setAtendimentos ] = useState([]);
    const [atendimentoAberto, setAtendimentoAberto] = useState(null);

    async function fetchAtendimentos() {
        const response = await fetch(`http://localhost:3001/prontuarios/atendimentos/${paciente.id}`).then(res => (res.json()));
        setAtendimentos(response);
    }

    useEffect(() => {
        fetchAtendimentos();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Histórico de Atendimentos — {paciente?.nome}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {atendimentos.length > 0 ? (
                    <div className="overflow-y-auto max-h-[60vh]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-700">
                                    <th className="px-4 py-2">Data</th>
                                    <th className="px-4 py-2">Local</th>
                                    <th className="px-4 py-2">Profissional</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                {atendimentos.map((a) => (
                                    <React.Fragment key={a.id}>
                                    
                                    <tr
                                        className="border-b hover:bg-gray-50 transition cursor-pointer"
                                        onClick={() => setAtendimentoAberto(atendimentoAberto === a.id ? null : a.id)}
                                    >
                                        <td className="px-4 py-2 text-gray-800">
                                            {new Date(a.data).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {a.localAtendimento?.nome || "-"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {a.profissional?.nome || "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                a.status === "Finalizado"
                                                ? "bg-green-100 text-green-700"
                                                : a.status === "Pendente"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {a.status}
                                            </span>
                                        </td>
                                    </tr>

                                    {atendimentoAberto === a.id && (
                                    <tr className="bg-gray-50 border-b">
                                        <td colSpan={4} className="px-6 py-4 text-sm text-gray-700 space-y-2">
                                            <div>
                                                <span className="font-semibold text-gray-800">Subjetivo:</span>{" "}
                                                {a.subjetivo || <span className="text-gray-500">—</span>}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-800">Objetivo:</span>{" "}
                                                {a.objetivo || <span className="text-gray-500">—</span>}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-800">Avaliação:</span>{" "}
                                                {a.avaliacao || <span className="text-gray-500">—</span>}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-800">Plano:</span>{" "}
                                                {a.plano || <span className="text-gray-500">—</span>}
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-6">
                        Nenhum atendimento encontrado para este paciente.
                    </p>
                )}

                <div className="flex justify-end mt-5">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}