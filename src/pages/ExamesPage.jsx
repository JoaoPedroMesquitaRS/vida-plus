import { useState } from "react";
import ExameSelecionadoCard from "../components/exame/ExameSelecionado";

export default function ExamesPage() {

    const [ exames, setExames ] = useState([]);
    // const [ valor, setValor ] = useState('Pendente');

    const [ exameSelecionado, setExameSelecionado ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);

    const [ opcao, setOpcao ] = useState('');

    async function listarExames(opcao) {
        const response = await fetch(`http://localhost:3001/exames?opcao=${opcao}`).then((res) => res.json());
        console.log(response);
        setExames(response);
    }

    // useEffect(() => {
        
    //     async function inciarfluxo() {
    //         await listarExames();
    //     }

    //     inciarfluxo()
    // }, [opcao]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Exames
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Gerencie os exames pendentes e finalizados.
                    </p>
                </div>

                <div className="mb-12">
                    <div className="justify-between items-center">
                        <div className="flex items-center gap-2">
                            <label className="text-gray-700">Selecione a situação:</label>
                            <select name="" id=""
                                className="border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500"
                                value={opcao}
                                onChange={(e) => {
                                    setOpcao(e.target.value);
                                    listarExames(e.target.value);
                                }}
                            >
                                <option value="">-</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Paciente</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Categoria</th>
                                    { opcao && opcao === 'Finalizado' ? (
                                            <th className="px-4 py-3 text-sm font-medium text-gray-700">Data do Laudo</th>
                                        ) : (
                                            <th className="px-4 py-3 text-sm font-medium text-gray-700">Data da Solicitação</th>
                                        )
                                    }
                                    <th className="px-4 py-3 text-sm font-medium text-gray-700">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                
                                {exames && exames.length > 0 ? (
                                    exames.map((exame) => (
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-800">{exame.paciente.nome}</td>
                                            <td className="px-4 py-3 text-gray-700">{exame.categoria}</td>
                                            {exame.createdAt ? (
                                                    <td className="px-4 py-3 text-gray-700">{new Date(exame.createdAt).toLocaleDateString("pt-BR")}</td>
                                                ) : (
                                                    <td className="px-4 py-3 text-gray-700">{new Date(exame.updatedAt).toLocaleDateString("pt-BR")}</td>
                                                )
                                            }
                                            <td className="px-4 py-3">
                                                    {opcao && opcao === 'Pendente' ? (
                                                        <button 
                                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                                            onClick={() => {
                                                                setExameSelecionado(exame);
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            Iniciar
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                                            onClick={() => {
                                                                setExameSelecionado(exame);
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            Detalhes
                                                        </button>
                                                    ) 
                                                    }
                                            </td>
                                        </tr>
                                    ))
                                ): (
                                        <tr>
                                            <td 
                                                colSpan={4}
                                                className="px-4 py-3 text-center text-gray-800 italic"
                                            >
                                                Não há exames
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <ExameSelecionadoCard exame={exameSelecionado} onClose={() => setShowModal(false)} opcao={opcao} />
            )}

        </div>
    );
}
