interface Props {
    plate: string | number,
    rut: string,
    username:string,
    confirmPlate: boolean,
    handleContinue: () => void,
    handleAgain: () => void,
}

function AcceptPlate({ plate, rut, username, confirmPlate, handleAgain, handleContinue }: Props) {
    return (
        <div className="mt-7">
            <h4 className="w-full text-3xl text-center">
                {confirmPlate ? plate : "Matrícula cargada:"}
                <span className="font-medium">
                    {confirmPlate ? ` - ${rut}` : plate}
                </span>
            </h4>
            {!confirmPlate ?
                <div className="w-full flex gap-8 justify-center mt-8">
                    <button
                        onClick={handleContinue}
                        className="bg-blue-400 text-white font-medium p-2 px-3 rounded-lg hover:opacity-90">
                        Continuar
                    </button>
                    <button
                        onClick={handleAgain}
                        className="text-black font-medium p-2 px-3 rounded-lg hover:opacity-90">
                        Volver a Intentar
                    </button>
                </div>
                :
                <p className="text-center mt-3 font-medium text-blue-500">{username}</p>
            }
        </div>
    );
}

export default AcceptPlate;