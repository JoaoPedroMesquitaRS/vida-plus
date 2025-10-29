import React, { useEffect, useState } from "react";
import ModalLocalAtendimento from "../components/modalLocalAtendimento.jsx";

export default function LocalAtendimentoPage() {

    const [showModal, setShowModal] = useState(false);
    const [ locais, setLocais ] = useState([]);
    const [profissionais, setProfissionais] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/locais-atendimento')
        .then((res) => res.json())
        .then(setLocais);
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
                        onClick={() => setShowModal(true)}
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
                    <article className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <h2 className="text-lg font-medium text-gray-800">{local.nome}</h2>
                                <p className="mt-1 text-sm text-gray-600">{local.endereco}</p>
                                <p className="mt-2 text-sm text-gray-500">{local.info}</p>

                                <div className="mt-3">
                                    <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-green-800">{local.tipo}</span>
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700">Profissionais</h3>
                                    <ul className="mt-2 space-y-2">
                                        {(profissionais[local.id] || []).map((prof) => (
                                            <li
                                                key={prof.id}
                                                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{prof.nome}</p>
                                                    <p className="text-xs text-gray-500">{prof.especialidade}</p>
                                                </div>
                                                <div className="text-xs text-gray-500">{prof.registro}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                        data-open-edit-modal
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-red-700">
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
                <ModalLocalAtendimento onClose={() => setShowModal(false)} />
            )}

            {/* Rodapé simples */}
            {/* <footer className="mt-10 max-w-6xl mx-auto text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Seu Sistema • Gerencie seus locais de atendimento
            </footer> */}
        </div>
    );
}
