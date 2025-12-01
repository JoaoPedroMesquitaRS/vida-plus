import { useEffect, useState } from "react";
import SolicitarExameCard from "../exame/SolicitarExameCard.jsx";

export default function ModalAtendimentoPaciente({ onClose, paciente }) {

    const [ atendimentoDigitado, setAtendimentoDigitado ] = useState({
        idPaciente: paciente.id, idProntuario: 0, idLocalAtendimento: 0, idProfissional: 0, data: '', status: '', subjetivo: '', objetivo: '', avaliacao: '', plano: ''
    });

    const [ iniciar ] = useState({
        idPaciente: paciente.id, idProntuario: 0, idLocalAtendimento: 1, idProfissional: 1, data: new Date().toISOString(), status: 'Em andamento'
    });

    const [ locais, setLocais ] = useState([]);
    const [ profissionais, setProfissionais ] = useState([]);
    
    const [ idAtendimento, setIdAtendimento ] = useState();

    const [ atendimentoCriado, setAtendimentoCriado ] = useState([]);

    async function validarProntuario() {

        const response = await fetch(`http://localhost:3001/prontuarios/validar/${paciente.id}`).then((res) => res.json());
        if(response.existe === true ){
            console.log('Prontuario existe');
        } else{
            console.log('Prontuario não existe')
        }
        return response;
    };

    async function finalizarAtendimento(dados) {
        const response = await fetch(`http://localhost:3001/atendimentos/${idAtendimento}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        }).then(res => (res.json()));
        return response.id;
    };

    async function criarAtendimento(dados) {
        const response = await fetch('http://localhost:3001/atendimentos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        }).then(res => (res.json()));
        return response;
    };

    async function fetchLocais() {
        const data = await fetch('http://localhost:3001/locais-atendimento').then((res) => res.json()).then(setLocais);
        return data;
    }

    async function fetchProfissionais(){
        const data = await fetch('http://localhost:3001/profissionais').then((res) => res.json()).then(setProfissionais);
        return data;
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setAtendimentoDigitado(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    useEffect(() => {

        async function fluxo() {
            fetchLocais();
            fetchProfissionais();

            const resultadoProntuario = await validarProntuario();
            const idProntuarioGerado = resultadoProntuario.idProntuario;

            const dadosAtendimento = {
                ...iniciar,
                idProntuario: idProntuarioGerado,
            };

            const atendimentoGerado = await criarAtendimento(dadosAtendimento);
            setAtendimentoCriado(atendimentoGerado);

            setIdAtendimento(atendimentoGerado.id);
        }

        fluxo();

    }, [])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">

                <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">Atendimento do Paciente</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Paciente Selecionado
                        </label>
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700">
                            {paciente.nome}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local de Atendimento
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            onChange={(e) => 
                                setAtendimentoDigitado((prev) => ({
                                    ...prev,
                                    idLocalAtendimento: e.target.value
                                }))
                            }
                        >
                            <option value="">Selecione um local</option>
                            {locais.map((local) => (
                                <option value={local.id}>{local.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profissional
                        </label>
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            onChange={(e) => {
                                setAtendimentoDigitado((prev) => ({
                                    ...prev,
                                    idProfissional: e.target.value
                                }))
                            }}
                        >
                            <option value="">Selecione o profissional</option>
                            {profissionais.map((prof) => (
                                <option value={prof.id}>{prof.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subjetivo</label>
                            <textarea
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Relato do paciente..."
                                name="subjetivo"
                                value={atendimentoDigitado.subjetivo}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Observações clínicas..."
                            name="objetivo"
                            value={atendimentoDigitado.objetivo}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Análise do profissional..."
                            name="avaliacao"
                            value={atendimentoDigitado.avaliacao}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plano</label>
                        <textarea
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Plano de tratamento..."
                            name="plano"
                            value={atendimentoDigitado.plano}
                            onChange={handleChange}
                        ></textarea>
                        </div>
                    </div>

                    <SolicitarExameCard atendimentoCriado={atendimentoCriado}/>

                </div>

                <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={async () => {
                            const dados = {
                                ...atendimentoDigitado,
                                idLocalAtendimento: Number(atendimentoDigitado.idLocalAtendimento),
                                idProfissional: Number(atendimentoDigitado.idProfissional),
                                status: "Finalizado",
                            };

                            const resposta = await finalizarAtendimento(dados);
                            onClose();
                        }}
                    >
                        Finalizar Atendimento
                    </button>
                </div>
            </div>
        </div>
        );
}