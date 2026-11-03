function Mensaje({texto}){
    if(!texto){
        return null;

    }
    return (
        <div className="alert alert-info" role = "status">
            {texto}
        </div>
    );
}

export default Mensaje;