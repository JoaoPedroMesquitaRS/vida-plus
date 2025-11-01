import { useEffect, useState } from "react";
import Profissionais from '../components/local-atendimento/Profissionais.jsx';

export default function ModalLocalAtendimento({ onClose, onLocalCriado, modo, localSelecionado }) {

  const [ local, setLocal ] = useState({
    nome: '', endereco: '', tipo: [], info: ''
  });

  useEffect(() => {
    if(modo === 'editar' && localSelecionado){
      setLocal(localSelecionado)
      console.log(localSelecionado.id)
    }
    if(modo === 'criar'){
      setLocal({
        nome: '', endereco: '', tipo: [], info: ''
      })
    }
  }, [modo, localSelecionado])
  
  async function handleChange(e) {
    const { name, value } = e.target;
    setLocal(prev => ({
        ...prev,
        [name]: value
    }));
  };

  function handleTipoChange(e) {
    const { value, checked } = e.target;
    setLocal((prev) => {
      let novosTipos;
      if (checked) {
        // Adiciona o tipo selecionado
        novosTipos = [...prev.tipo, value];
      } else {
        // Remove o tipo desmarcado
        novosTipos = prev.tipo.filter((t) => t !== value);
      }
      return { ...prev, tipo: novosTipos };
    });
  }

  async function adicionarLocal(novoLocal) {
    console.log(novoLocal)
    const data = await fetch("http://localhost:3001/locais-atendimento", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(novoLocal)
    }).then(res => (res.json()));
    onLocalCriado()
    onClose();
  };

  async function editarLocal(localEditado) {
    const data = await fetch(`http://localhost:3001/locais-atendimento/${localSelecionado.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(localEditado)
    }).then(res => (res.json()));
    onLocalCriado()
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Cadastrar / Editar Local
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Corpo */}
        <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Local
            </label>
            <input
              type="text"
              value={local.nome}
              name="nome"
              placeholder="Ex: Clínica Central"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              placeholder="Rua, número, bairro..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="endereco"
              value={local.endereco}
              onChange={handleChange}
            />
          </div>

          {/* Tipos */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Atendimento
            </span>
            <div className="flex flex-wrap gap-4">
              {["Presencial", "Homecare", "Teleatendimento"].map((tipo) => (
                <label key={tipo} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600" 
                    value={tipo}
                    checked={local.tipo.includes(tipo)}
                    onChange={handleTipoChange}
                  />
                  <span>{tipo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observação
            </label>
            <textarea
              placeholder="Ex: Neste local o tempo de tolerância é 10 minutos."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="info"
              value={local.info}
              onChange={handleChange}
            ></textarea>
          </div>

          <Profissionais localId={localSelecionado.id}/>
          
        </div> 

        {/* Rodapé */}
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
                const novoLocal = {
                  nome: local.nome,
                  endereco: local.endereco,
                  tipo: local.tipo,
                  info: local.info
                };
                await adicionarLocal(novoLocal);
              }
              if(modo === 'editar'){
                const localEditado = {
                  nome: local.nome,
                  endereco: local.endereco,
                  tipo: local.tipo,
                  info: local.info
                };
                await editarLocal(localEditado)
              }
              // onClose;
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}