import './CriterFooter.css';

function CriterFooter({ estado, pregunta }) {
    return (
        <div>
            {estado.modo === 'game' ? 
                <div id="footer">
                    <div>
                        { pregunta.contenido }
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

export default CriterFooter;