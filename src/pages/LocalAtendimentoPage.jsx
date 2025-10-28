import React, { useState } from "react";
import ModalLocalAtendimento from "../components/modalLocalAtendimento.jsx";

export default function LocalAtendimentoPage() {

    const [showModal, setShowModal] = useState(false);

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
                <article className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-800">Clínica Central - Sala 5</h2>
                    <p className="mt-1 text-sm text-gray-600">Rua Jaime Soto Maior, 420 - São Lourenço, MG</p>
                    <p className="mt-2 text-sm text-gray-500">Neste local o tempo de tolerância para atraso é <strong>10 minutos</strong>.</p>

                    <div className="mt-3">
                        <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-green-800">Presencial</span>
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">Homecare</span>
                        </span>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700">Profissionais</h3>
                        <ul className="mt-2 space-y-2">
                        <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                            <div>
                            <p className="text-sm font-medium text-gray-800">Dr. João</p>
                            <p className="text-xs text-gray-500">Cardiologista</p>
                            </div>
                            <div className="text-xs text-gray-500">CRM 12345</div>
                        </li>
                        <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                            <div>
                            <p className="text-sm font-medium text-gray-800">Dra. Mariana</p>
                            <p className="text-xs text-gray-500">Fisioterapeuta</p>
                            </div>
                            <div className="text-xs text-gray-500">Registro 9876</div>
                        </li>
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

                {/* Espaço para mais cards - exemplo vazio */}
                <article className="rounded-lg border-dashed border-2 border-gray-200 bg-white/30 p-6 text-center text-sm text-gray-500">
                <p>Outro local...</p>
                </article>

                <article className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-800">Atendimento Homecare - Zona Sul</h2>
                    <p className="mt-1 text-sm text-gray-600">Endereço do paciente (varia conforme agendamento)</p>
                    <p className="mt-2 text-sm text-gray-500">Observação: deslocamento de equipe mediante confirmação.</p>

                    <div className="mt-3">
                        <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">Homecare</span>
                        </span>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700">Profissionais</h3>
                        <ul className="mt-2 space-y-2">
                        <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                            <div>
                            <p className="text-sm font-medium text-gray-800">Enf. Beatriz</p>
                            <p className="text-xs text-gray-500">Enfermagem</p>
                            </div>
                            <div className="text-xs text-gray-500">Coren 5566</div>
                        </li>
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

                {/* Placeholder para responsividade */}
                <div className="hidden md:block" aria-hidden="true"></div>
            </main>

            {/* Modal de criação / edição - apenas estrutura HTML, sem lógica */}
            <div
                className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 py-8 px-4 sm:items-center sm:py-0"
                aria-hidden="true"
                id="modal-create-edit"
                style={{ display: 'none' }}
            >
                <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-800">Criar / Editar Local de Atendimento</h2>
                    <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Fechar">
                        ✕
                    </button>
                    </div>

                    <form className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                        id="nome"
                        name="nome"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Ex.: Clínica Central - Sala 5"
                        />
                    </div>

                    <div>
                        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input
                        id="endereco"
                        name="endereco"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Rua, número, bairro, cidade - UF"
                        />
                    </div>

                    <div>
                        <label htmlFor="observacao" className="block text-sm font-medium text-gray-700">Observação</label>
                        <textarea
                        id="observacao"
                        name="observacao"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Ex.: neste local o tempo de tolerância para atraso é 10 minutos"
                        />
                    </div>

                    <fieldset className="mt-2">
                        <legend className="text-sm font-medium text-gray-700">Tipo de local</legend>
                        <div className="mt-2 flex flex-wrap gap-3">
                        <label className="inline-flex items-center gap-2">
                            <input type="checkbox" name="tipo_presencial" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">Presencial</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input type="checkbox" name="tipo_homecare" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">Homecare</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input type="checkbox" name="tipo_tele" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-700">Teleatendimento</span>
                        </label>
                        </div>
                    </fieldset>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profissionais do local</label>
                        <p className="mt-1 text-xs text-gray-500">Liste aqui os profissionais (somente visual — a lógica de adicionar não está incluída).</p>
                        <ul className="mt-2 space-y-2">
                        <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                            <div>
                            <p className="text-sm font-medium text-gray-800">Nome do Profissional</p>
                            <p className="text-xs text-gray-500">Especialidade</p>
                            </div>
                            <div className="text-xs text-gray-500">Identificador</div>
                        </li>
                        </ul>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                        type="button"
                        className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                        Cancelar
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                        Salvar Local
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>

            {showModal && (
                <ModalLocalAtendimento onClose={() => setShowModal(false)} />
            )}

            {/* Rodapé simples */}
            <footer className="mt-10 max-w-6xl mx-auto text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Seu Sistema • Gerencie seus locais de atendimento
            </footer>
        </div>
    );
}
