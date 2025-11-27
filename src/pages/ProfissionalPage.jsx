import { useEffect, useState } from "react"
import ModalCriarEditarProf from "../components/profissional-page/ModalCriarEditarProf.jsx";
import ModalCorfirmarExcluir from "../components/ModalCorfirmarExcluir.jsx";

export default function ProfissionalPage(){

    const [ profissionais, setProfissionais ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ modo, setModo ] = useState('');
    const [ profissionalSelecionado, setProfissionalSelecionado ] = useState({
        id: '', idLocalAtendimento: '', nome: '', local: '', especialidade: '', registro: '', telefone: '', email: ''
    });
    const [ idProfissionalSelecionado, setIdProfissionalSelecionado ] = useState('');

    async function fetchProfissionais(){
        const data = await fetch('http://localhost:3001/profissionais').then((res) => res.json()).then(setProfissionais);
    }

    useEffect(() => {
        fetchProfissionais();
    }, [])

    useEffect(() => {
        console.log(profissionais);
    }, [profissionais])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Profissionais Cadastrados</h1>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setShowModal(true);
                                setModo('criar')
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            + Criar Profissional
                        </button>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Veja, crie e edite profissionais.</p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {profissionais.map((prof) => (
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-200 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{prof.nome}</h2>
                            <p className="text-gray-600 mb-1">
                                {prof.especialidade?.nome ? (
                                    <>
                                        <span className="font-medium text-gray-700">Especialidade:</span> {" "} 
                                        {prof.especialidade.nome}
                                    </>
                                ):(
                                    <>
                                        <span className="font-medium text-gray-700">Especialidade:</span> -
                                    </>
                                )}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium text-gray-700">Registro:</span> {prof.registro}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium text-gray-700">Telefone:</span> {prof.telefone}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-700">E-mail:</span> {prof.email}
                            </p>
                        </div>

                        <div className="flex justify-start mt-4 gap-3">
                            <button 
                                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-xl hover:bg-blue-50 transition"
                                onClick={() => {
                                    setProfissionalSelecionado(prof);
                                    setShowModal(true);
                                    setModo('editar');
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-xl hover:bg-red-50 transition"
                                onClick={() => {
                                    setIdProfissionalSelecionado(prof.id);
                                    setModo('excluir-profissional');
                                    setShowDeleteModal(true);
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            {showModal && (
                <ModalCriarEditarProf onClose={() => setShowModal(false)} modo={modo} fetchProfissionais={fetchProfissionais} profissionalSelecionado={profissionalSelecionado} />
            )}

            {showDeleteModal && (
                <ModalCorfirmarExcluir onClose={() => setShowDeleteModal(false)} idProfissionalSelecionado={idProfissionalSelecionado} modo={modo} onProfissionalRegistro={fetchProfissionais} />
            )}

            {/* <footer className="mt-10 max-w-6xl mx-auto text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Seu Sistema • Gerencie seus locais de atendimento
            </footer> */}
        </div>
    )
}