import useAuthGuard from "../hooks/useAuthGuard.js";

export default function HomePage(){

    const usuario = useAuthGuard();

    if (!usuario) return <p>Carregando...</p>;

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
            
            <div className="text-center max-w-xl">
                
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Bem-vindo ao VidaPlus
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Estamos felizes em ter você aqui!  
                    Utilize o menu lateral para navegar pelo sistema e acessar as funcionalidades disponíveis.
                </p>

            </div>

        </div>

    )
}