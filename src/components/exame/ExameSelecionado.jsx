import { useState } from "react";

export default function ExameSelecionadoCard({ exame, onClose, opcao, listarExames }) {

    const [ resultadoDigitado, setResultadoDigitado ] = useState('')

    async function alterarExame(dados) {
        const response = await fetch(`http://localhost:3001/exames/${exame.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        }).then((res) => res.json())
        return response;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Exame Selecionado
                    </h2>

                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg">
                        Atendimento #{exame?.idAtendimento}
                    </span>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paciente
                    </label>
                    <input
                        type="text"
                        value={exame?.paciente.nome || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                    </label>
                    <input
                        type="text"
                        value={exame?.categoria || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Indicação
                    </label>
                    <input
                        type="text"
                        value={exame?.indicacao || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data da Solicitação
                    </label>
                    <input
                        type="text"
                        value={new Date(exame?.createdAt).toLocaleDateString("pt-BR") || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Resultado (laudo)
                    </label>
                    <textarea
                        rows="5"
                        placeholder="Digite o resultado do exame..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={exame.resultado ? exame.resultado : resultadoDigitado}
                        onChange={(e) => setResultadoDigitado(e.target.value)}
                    ></textarea>
                </div>

                <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                        onClick={() => {
                            setResultadoDigitado('');
                            onClose();
                        }}
                    >
                        Cancelar
                    </button>

                    {opcao && opcao === 'Finalizado' ? 
                        (
                            <button 
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                onClick={async() => {
                                    setResultadoDigitado('');
                                    onClose();
                                }}
                            >
                                Fechar
                            </button>    
                        ) : (
                            <button 
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                onClick={async() => {
                                    const dados = {
                                        dataResultado: new Date().toISOString(), 
                                        resultado: resultadoDigitado, 
                                        status: 'Finalizado'
                                    }
                                    await alterarExame(dados)
                                    setResultadoDigitado('');
                                    onClose();
                                    listarExames('Pendente');
                                }}
                            >
                                Salvar
                            </button>
                        )
                    }

                </div>

            </div>
            
        </div>
    );
}