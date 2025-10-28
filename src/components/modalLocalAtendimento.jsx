export default function ModalLocalAtendimento({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        {/* Cabeçalho */}
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
              placeholder="Ex: Clínica Central"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
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
            ></textarea>
          </div>

          {/* Profissionais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profissionais do Local
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">
                  Dr. João Silva — Fisioterapeuta
                </span>
                <button className="text-blue-600 text-sm hover:underline">
                  Remover
                </button>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">
                  Dra. Ana Costa — Psicóloga
                </span>
                <button className="text-blue-600 text-sm hover:underline">
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}