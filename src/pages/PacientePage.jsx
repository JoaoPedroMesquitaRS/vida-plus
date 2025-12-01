import { useEffect, useState } from "react"
import ModalCriarEditarPaciente from "../components/paciente-page/ModalCriarEditarPaciente.jsx";
import useAuthGuard from "../hooks/useAuthGuard.js";

export default function PacientePage(){

    const [ pacientes, setPacientes ] = useState([]);
    const [ modo, setModo ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ pacienteSelecionado, setPacienteSelecionado ] = useState({
        id: '', nome: '', cpf: '', dataNascimento: '', telefone: ''
    })

    const token = localStorage.getItem("token");

    async function fetchPacientes() {
        const data = await fetch('http://localhost:3001/pacientes', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json()).then(setPacientes);
        return data;
    }

    useEffect(() => {
        fetchPacientes();
    }, []);

    const usuario = useAuthGuard();
    const userRole = usuario?.role;

    if(!usuario) return <p>Aguarde...</p>

    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Pacientes Cadastrados</h1>
                    
                    {userRole !== 'recepcionista' && userRole !== 'admin' ?

                        <></>
                    
                    :

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(true);
                                    setModo('criar');
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                + Criar Paciente
                            </button>
                        </div>
                    
                    }

                </div>
                <p className="mt-2 text-sm text-gray-500">Veja, crie e edite pacientes.</p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {pacientes.map((paciente) => (
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-200 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{paciente.nome}</h2>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium text-gray-700">CPF:</span> {paciente.cpf}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium text-gray-700">Data nascimento: </span>
                                {(() => {
                                    const [ano, mes, dia] = paciente.dataNascimento.split("-");
                                    return `${dia}/${mes}/${ano}`;
                                })()}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium text-gray-700">Telefone:</span> {paciente.telefone}
                            </p>
                        </div>

                        <div className="flex justify-start mt-4 gap-3">
                            <button 
                                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-xl hover:bg-blue-50 transition"
                                onClick={() => {
                                    setPacienteSelecionado(paciente);
                                    setShowModal(true);
                                    setModo('editar');
                                }}
                            >
                                Editar
                            </button>
                            
                        </div>
                    </div>
                ))}
            </main>

            {showModal && (
                <ModalCriarEditarPaciente onClose={() => setShowModal(false)} modo={modo} fetchPacientes={fetchPacientes} pacienteSelecionado={pacienteSelecionado} />
            )}

        </div>
    )
};