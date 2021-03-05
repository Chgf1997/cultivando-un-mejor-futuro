import './CriterFeedback.css';

// import vect_feednoticia from '../../assets/vectores/VECT_FEED_NOTICIA_01.svg'
// import vect_correcto from '../../assets/vectores/VECT_CORRECTO.svg'
// import vect_incorrecto from '../../assets/vectores/VECT_INCORRECTO.svg'
// import vect_ramader from '../../assets/vectores/VECT_RAMA_DER.svg'
// import vect_ramaizq from '../../assets/vectores/VECT_RAMA_IZQ.svg'

import Personage from './Personages/Personage';
import BoxTalk from './BoxTalk/BoxTalk.jsx';

export default ({
    estado: {escena, modo, respuesta, personaje},
    pregunta,
    continuar, 
    reiniciar
}) => {
    // console.log(pregunta, 'pre')

    // const vect_evaluacion = {
    //     correcto: vect_correcto,
    //     incorrecto: vect_incorrecto
    // }

    const titleTalk = () => {
        if (escena === 'feedback'){
            return respuesta.verifyTrush ?
                pregunta.opcion.respuesta_afirmativa
                :
                pregunta.opcion.respuesta_negativa 
        }
    }

    const textTalk = () => {
        console.log('texttalk');
        switch(escena){
            case 'feedback':
                return pregunta.opciones
                    .filter(op => op.titulo === respuesta.option)[0]
                    .feedback;
            case 'intro':
            case "pyramid":
                return pregunta.text;
            default :
                return pregunta.titulo;
        }
    }

    return (
        <div id="feedback">
            <div className="feedback-container">
                {/* <div className="feedback-bg-container"> */}
                    {/* <div className="feedback-bg" /> */}
                {/* </div> */}
                
                <div className="persons-container">
                    {/* Personaje luisa */}
                    <div className="person-container left">
                        {   (   
                                (modo === 'talk' && personaje === 'luisa') ||
                                escena === 'question' ||
                                escena === 'feedback'
                            ) &&
                            <BoxTalk
                                escena={escena}
                                modo={modo}
                                text={textTalk()}
                                title={titleTalk()}
                                onClick={()=> {continuar()}}
                            />
                        }
                        <Personage
                            name="luisa"
                            escena={escena}
                            modo={modo}
                            action={personaje === 'luisa'}
                        />
                    </div>

                    {/* Personaje yeiner */}
                    <div className="person-container right">
                        {   (
                                (modo === 'talk' && personaje === 'yeiner') ||
                                escena === 'answer' 
                            ) &&
                            <BoxTalk
                                escena={escena}
                                modo={modo}
                                text={textTalk()}
                                title={titleTalk()}
                                onClick={()=> {continuar()}}
                            />
                        }
                        <Personage
                            name="yeiner"
                            escena={escena}
                            modo={modo}
                            action={personaje === 'yeiner'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}