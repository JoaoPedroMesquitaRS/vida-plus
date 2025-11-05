import { useEffect, useState } from "react"

export default function ModalCriarEditarPaciente({ onClose , modo, fetchPacientes, pacienteSelecionado }){

    const [ paciente, setPaciente ] = useState({
        nome: '', cpf: '', dataNascimento: '', telefone: ''
    });

    useEffect(() => {
        if(modo === 'criar'){
            setPaciente({
                nome: '', cpf: '', dataNascimento: '', telefone: ''
            });
        }
        if(modo === 'editar'){
            setPaciente(pacienteSelecionado)
        }
    }, [modo, pacienteSelecionado])

    async function registrarPaciente(pacienteDigitado) {
        if(modo === 'criar'){
            const response = await fetch('http://localhost:3001/pacientes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(pacienteDigitado)
            }).then((res) => (res.json()));
        }
        if(modo === 'editar'){
            const response = await fetch(`http://localhost:3001/pacientes/${pacienteSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(pacienteDigitado)
            }).then((res) => (res.json()));
        }
        fetchPacientes(),
        onClose();
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setPaciente(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
            
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Cadastrar / Editar Profissional
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Fechar"
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        ✕
                    </button>
                </div>
        
                <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Paciente
                        </label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Ex: Clínica Central"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={paciente.nome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CPF
                            </label>
                            <input
                                type="text"
                                placeholder="Rua, número, bairro..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="cpf"
                                value={paciente.cpf}
                                onChange={handleChange}
                            />
                        </div>
            
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data nascimento
                            </label>
                            <input
                                type="date"
                                placeholder="EX 1234-UF"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="dataNascimento"
                                value={paciente.dataNascimento}
                                onChange={handleChange}
                            />
                        </div>
            
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Telefone
                            </label>
                            <input
                                type="tel"
                                placeholder="(XX) XXXX-XXXX"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="telefone"
                                value={paciente.telefone}
                                onChange={handleChange}
                            />
                        </div>
            
                    </div>
        
                    {/* <Profissionais localId={localSelecionado.id}/> */}
                    
                </div> 
    
                <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={async() => {
                            if(modo === 'criar'){
                                const profissionalDigitado = {
                                    nome: paciente.nome,
                                    cpf: paciente.cpf,
                                    dataNascimento: paciente.dataNascimento,
                                    telefone: paciente.telefone,
                                };
                                await registrarPaciente(profissionalDigitado);
                            }
                            if(modo === 'editar'){
                                const profissionalDigitado = {
                                    nome: paciente.nome,
                                    cpf: paciente.cpf,
                                    dataNascimento: paciente.dataNascimento,
                                    telefone: paciente.telefone,
                                };
                                await registrarPaciente(profissionalDigitado)
                            }
                        }}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
};