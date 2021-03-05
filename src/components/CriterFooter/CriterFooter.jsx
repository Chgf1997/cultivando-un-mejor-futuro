
import './CriterFooter.css';

function CriterFooter({ estado, pregunta }) {
    return (
        <>
            {estado.modo === 'game' ? 
                <div className="footer" >
                    <div>
                        { pregunta.contenido }
                    </div>
                </div>
                :
                null
            }
        </>
    );
}

export default CriterFooter;