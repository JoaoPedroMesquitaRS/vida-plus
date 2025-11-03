import { useEffect, useState } from "react"

export default function ModalCriarEditarProf({ onClose , modo, fetchProfissionais, profissionalSelecionado }){

    const [ locais, setLocais ] = useState([]);
    const [ profissional, setProfissional ] = useState({
        nome: '', idLocalAtendimento: '', especialidade: '', registro: '', telefone: '', email: ''
    });

    async function fetchLocais() {
        const data = await fetch('http://localhost:3001/locais-atendimento').then((res) => res.json()).then(setLocais);
    }

    useEffect(() =>{
        fetchLocais();
    }, [])

    useEffect(() => {
        if(modo === 'criar'){
            setProfissional({
                nome: '', idLocalAtendimento: '', especialidade: '', registro: '', telefone: '', email: ''
            })
        }
        if(modo === 'editar'){
            setProfissional(profissionalSelecionado)
        }
    }, [modo, profissionalSelecionado])

    async function registrarProfissional(profissionalDigitado) {
        if(modo === 'criar'){
            const response = await fetch('http://localhost:3001/profissionais', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(profissionalDigitado)
            }).then((res) => (res.json()));
        }
        if(modo === 'editar'){
            const response = await fetch(`http://localhost:3001/profissionais/${profissionalSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(profissionalDigitado)
            }).then((res) => (res.json()));
        }
        fetchProfissionais(),
        onClose();
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setProfissional(prev => ({
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
                            Nome do Profissional
                        </label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Ex: Clínica Central"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={profissional.nome}
                            onChange={handleChange}
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local de Atendimento
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={profissional.idLocalAtendimento}
                            onChange={(e) => 
                                setProfissional((prev) => ({
                                    ...prev,
                                    idLocalAtendimento: e.target.value
                                }))
                            }
                        >
                            <option value="">-</option>
                            {locais.map((local) => (
                                <option value={local.id}>{local.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Especialidade
                            </label>
                            <input
                                type="text"
                                placeholder="Rua, número, bairro..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="especialidade"
                                value={profissional.especialidade}
                                onChange={handleChange}
                            />
                        </div>
            
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registro
                            </label>
                            <input
                                type="text"
                                placeholder="EX 1234-UF"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="registro"
                                value={profissional.registro}
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
                                value={profissional.telefone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="email@email.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="email"
                                value={profissional.email}
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
                                    nome: profissional.nome,
                                    idLocalAtendimento: profissional.idLocalAtendimento,
                                    especialidade: profissional.especialidade,
                                    registro: profissional.registro,
                                    telefone: profissional.telefone,
                                    email: profissional.email
                                };
                                await registrarProfissional(profissionalDigitado);
                            }
                            if(modo === 'editar'){
                                const profissionalDigitado = {
                                    nome: profissional.nome,
                                    idLocalAtendimento: profissional.idLocalAtendimento,
                                    especialidade: profissional.especialidade,
                                    registro: profissional.registro,
                                    telefone: profissional.telefone,
                                    email: profissional.email
                                };
                                await registrarProfissional(profissionalDigitado)
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