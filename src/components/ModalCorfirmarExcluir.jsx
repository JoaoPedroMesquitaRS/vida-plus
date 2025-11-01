export default function modalConfirmarExcluir({ onClose, idLocalSelecionado, modo }){

    async function deletar(modo) {
        if(modo === 'excluir-local'){
            const response = await fetch(`http://localhost:3001/locais-atendimento/3}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        
            <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Atenção!
                </h2>
            </div>

            <div className="px-6 py-5">
                <p className="text-gray-700 text-sm">Tem certeza que deseja excluir?</p>
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
                    onClick={async () => {
                        onClose;
                        await deletar(modo);
                        console.log(idLocalSelecionado)
                    }}
                >
                    Deletar
                </button>
            </div>
        </div>
    </div>
    )
}