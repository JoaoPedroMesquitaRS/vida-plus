import React, { useEffect, useState } from "react";
import ModalLocalAtendimento from "../components/ModalLocalAtendimento.jsx";
import ModalCorfirmarExcluir from "../components/ModalCorfirmarExcluir.jsx";

export default function LocalAtendimentoPage() {

    const [ showModal, setShowModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const [ locais, setLocais ] = useState([]);
    const [ profissionais, setProfissionais ] = useState({});
    const [ modo, setModo ] = useState('');

    const [ localSelecionado, setLocalSelecionado ] = useState({
        id: '', nome: '', endereco: '', tipo: [], info: ''
    })

    const [ idLocalSelecionado, setIdLocalSelecionado ] = useState('');
    
    async function fetchLocais() {
        fetch('http://localhost:3001/locais-atendimento')
        .then((res) => res.json())
        .then(setLocais);
    }

    useEffect(() => {
        fetchLocais();
    }, []);
    
    useEffect(() => {

        locais.forEach((local) => {
            if (local.id) {
                fetch(`http://localhost:3001/locais-atendimento/profissional/${local.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setProfissionais((prev) => ({
                        ...prev,
                        [local.id]: data.profissionais || []  // 👈 pega apenas o array
                        }));
                    })
                    .catch((err) => console.error("Erro ao carregar profissionais:", err));
            }
        });
    }, [locais])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Locais de Atendimento</h1>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setShowModal(true);
                            setModo('criar')
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                    + Criar Local
                    </button>
                </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Veja, crie e edite locais onde os serviços são prestados.</p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {/* Card de exemplo - repetir dinamicamente */}
                {locais.map((local) =>(
                    <article className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-200 flex flex-col justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{local.nome}</h2>
                                <p className="mt-1 text-sm text-gray-600">{local.endereco}</p>
                                <p className="mt-2 text-sm text-gray-500">{local.info}</p>

                                <div className="mt-3">
                                    <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                                        {
                                            local.tipo.map((tipos) => (
                                                <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-green-800">{tipos}</span>
                                            ))
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-start mt-4 gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-xl hover:bg-blue-50 transition"
                                        data-open-edit-modal
                                        onClick={() => {
                                            setModo('editar');
                                            setLocalSelecionado({
                                                id: local.id,
                                                nome: local.nome,
                                                endereco: local.endereco,
                                                info: local.info,
                                                tipo: local.tipo
                                            })
                                            setShowModal(true)
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-xl hover:bg-red-50 transition"
                                        onClick={() => {
                                            setIdLocalSelecionado(local.id);
                                            setModo('excluir-local');
                                            setShowDeleteModal(true)
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}

                {/* Placeholder para responsividade */}
                <div className="hidden md:block" aria-hidden="true"></div>
            </main>

            {showModal && (
                <ModalLocalAtendimento onClose={() => setShowModal(false)} onLocalCriado={fetchLocais} modo={modo} localSelecionado={localSelecionado} />
            )}

            {showDeleteModal && (
                <ModalCorfirmarExcluir onClose={() => setShowDeleteModal(false)} idLocalSelecionado={idLocalSelecionado} modo={modo} onLocalCriado={fetchLocais} />
            )}

            {/* Rodapé simples */}
            {/* <footer className="mt-10 max-w-6xl mx-auto text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Seu Sistema • Gerencie seus locais de atendimento
            </footer> */}
        </div>
    );
}
