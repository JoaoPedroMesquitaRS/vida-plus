import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ModalAtendimentoPaciente from "../components/atendimento-modal/ModalAtendimentoPaciente.jsx";
import ModalHistoricoAtendimentos from "../components/historico-modal/ModalHistoricoAtendimento.jsx";
import { Link } from "react-router-dom";
import useAuthGuard from "../hooks/useAuthGuard.js";

export default function BuscarPacientePage(){

    
    const [ filtros ] = useState([
        'Nome', 'CPF', 'Data de Nascimento'
    ]);
    const [ filtroSelecionado, setFiltroSelecionado ] = useState('Nome');
    const [ valorBusca, setValorBusca ] = useState('');
    const [ pacienteSelecionado, setPacienteSelecionado ] = useState('');
    
    const [ resultados, setResultados ] = useState([]);
    
    const [ showModal, setShowModal ] = useState(false);
    const [ showHistoricoModal, setShowHistoricoModal ] = useState(false);

    const [menuAberto, setMenuAberto] = useState(null);

    const token = localStorage.getItem("token");

    async function buscarPacientes(filtro, valor) {
        const data = await fetch(`http://localhost:3001/pacientes/buscar-pacientes?filtro=${filtro}&valor=${valor}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json());
        setResultados(data);

    }
    const usuario = useAuthGuard();

    if(!usuario) return <p>Aguarde...</p>

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Pacientes</h1>
                    <div className="flex items-center gap-3">
                        <Link
                            type="button"
                            to='/paciente'
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            + Criar / Editar Paciente
                        </Link>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Busque um paciente pelo filtro desejado e inicie o atendimento.</p>
            </header>

            <main className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Filtro de busca
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            onChange={(e) => {
                                setFiltroSelecionado(e.target.value)
                            }}
                        >
                            {filtros.map((filtro, index) => (
                                <option key={index} value={filtro}>{filtro}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buscar paciente
                        </label>
                        
                        {filtroSelecionado === 'Data de Nascimento' ? (
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={valorBusca}
                                onChange={(e) => {
                                    setValorBusca(e.target.value);
                                }}
                            />        
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Digite aqui..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={valorBusca}
                                        onChange={(e) => {
                                        setValorBusca(e.target.value);
                                    }}
                                />
                            )
                        }
                        
                    </div>

                    <button 
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={async () => {

                            if (!valorBusca.trim()) {
                                alert("Digite um valor para buscar.");
                                return;
                            }

                            await buscarPacientes(filtroSelecionado, valorBusca)
                        }}
                    >
                        Buscar
                    </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                                    CPF
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                                    Data de Nascimento
                                </th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                    
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {resultados.map((resultado) => (
                                <tr className="hover:bg-gray-50 transition" key={resultado.id}>
                                    <td className="px-6 py-3 text-gray-800">{resultado.nome}</td>
                                    <td className="px-6 py-3 text-gray-600">{resultado.cpf}</td>
                                    <td className="px-6 py-3 text-gray-600">
                                        {(() => {
                                            const [ano, mes, dia] = resultado.dataNascimento.split("-");
                                            return `${dia}/${mes}/${ano}`;
                                        })()}
                                    </td>
                                    <td className="px-6 py-3 text-right">

                                        <button
                                            onClick={() =>
                                            setMenuAberto(menuAberto === resultado.id ? null : resultado.id)
                                            }
                                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
                                        >
                                            Ações
                                            <ChevronDown
                                            className={`w-4 h-4 transition-transform ${
                                                menuAberto === resultado.id ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>

                                        {menuAberto === resultado.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                                    onClick={() => {
                                                    setMenuAberto(null);
                                                    setPacienteSelecionado(resultado);
                                                    setShowModal(true);
                                                    }}
                                                >
                                                    Iniciar
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                                                    onClick={() => {
                                                        setMenuAberto(null);
                                                        setPacienteSelecionado(resultado);
                                                        setShowHistoricoModal(true)
                                                    }}
                                                >
                                                    Histórico
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {showModal && (
                <ModalAtendimentoPaciente onClose={() => setShowModal(false)} paciente={pacienteSelecionado}/>
            )}

            {showHistoricoModal && (
                <ModalHistoricoAtendimentos onClose={() => setShowHistoricoModal(false)} paciente={pacienteSelecionado}/>
            )}

        </div>   
    )
}