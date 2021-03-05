import { useState, useEffect } from 'react';

import CriterHeader from '../CriterHeader/CriterHeader';
import Content from '../Content/Content';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import CriterFooter from '../CriterFooter/CriterFooter';

import CriterFeedback from '../CriterFeedback/CriterFeedback';

import dataQuestion from './data.js';
import introConversation from './Intro/intro'

import Modal from '../Utils/Modal/Modal';
import Instructions from './Intro/Instructions'

export default () => {
    const smallWidth = window.innerWidth < 900;
    const [estado, setEstado] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [comida, setComida] = useState({});
    const [pregunta, setPregunta] = useState({});
    const [modalIntro, setModalIntro] = useState(false);
    const [conversationIntro, setConversationIntro] = useState([]);

    const contestar = (option) => {
        if (estado.escena !== 'question'){
            return ;
        }

        // Verificar si la respuesta es correcta
        let verifyTrush = pregunta.opcion.correcta.includes(option.titulo);

        // Incrementar puntuaje
        let pts = verifyTrush ? 10 * estado.multiplicador : 0;
        // Verificar Vidas
        let intentos = verifyTrush ? estado.intentos : estado.intentos -1;

        // Nuevo estado
        let newState = {
            escena: 'feedback',
            intentos,
            puntaje: (estado.puntaje + pts) < estado.puntajeMax ? 
                estado.puntaje + pts
                :
                estado.puntaje
            ,
            respuesta: { 
                verifyTrush,
                option: option.titulo
            },
            pts
        }

        // Cambiar 

        // console.log({
        //     pregunta,
        //     seleccion: option,
        //     verifyTrush,
        //     pts,
        //     intentos
        // })

        setEstado({...estado, ...newState})

        // console.log({ ...estado, ...newState })
    };

    const continuar = () => {
        // cambiar de pregunta, hasta finalizar el juego
        // console.log('continuar', {
        //     comida,
        //     foodList,
        //     pregunta
        // })
        let foodQuestions = [...comida.preguntas];
        let newComida = {};
       
        if (foodQuestions.length > 1){
            // si la comida tiene preguntas, ir quitando
            foodQuestions.shift();
            newComida = {
                ...comida, 
                preguntas: foodQuestions
            }

            setPregunta(newComida.preguntas[0]);

            // console.log('newPregutan', pregunta);
        }else if (foodList.length > 1){ 
            // si ya no tiene preguntas, seleccionar otra comida
            let newFoodList = [...foodList]
            
            newComida = newFoodList.shift();
            
            setFoodList(newFoodList);
            setPregunta(newComida.preguntas[0]);
        }else {
            setPregunta({});
            setFoodList([])
            // console.log('fin del juego')
        }

        // si ya no hay comidas, finalizar juego
        setComida(newComida);

        setEstado({
            ...estado,
            modo: newComida.id ? "game" :  "talk",
            escena: newComida.id ? "question" : "feedbackEnd",
            respuesta: null
        })
        // console.log('continuar', foodList)
        
    };

    const iniciar = () => {
        let foodListData = dataQuestion;
        let food = foodListData.shift();
// question
// answer
        setEstado({
            modo: 'game',
            escena: 'question',
            intentos: 3,
            puntaje: 0,
            multiplicador: 1,
            puntajeMax: 1000,
            racha: 0,
            respuesta: null
        })

        setFoodList([
            foodListData[0],
            foodListData[1]
        ]);
        
        setComida(food);
        setPregunta(food.preguntas[0]);
    };

    const tutorial = () => {
        let question = introConversation.shift();

        setEstado({
            modo: 'talk',
            escena: 'intro',
            personaje: 'luisa',
            intentos: 3
        })
        setPregunta(question);
    }

    const continuarTuto = () => {
        let question = introConversation.shift();

        if (!question){
            // Se acabaron las preguntas, comenzar juego
            return iniciar();
        }

        let newEstado = {
            ...estado, 
            personaje: question.personaje,
        }

        if (question.pyramid && estado.escena === 'intro'){
            newEstado = {...newEstado, escena : "pyramid"}
        }

        setEstado(newEstado)
        setPregunta(question);
    }

    useEffect(()=> {
        // console.log("Iniciar")
        // tutorial();
        iniciar();
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100%'
        }}>
            {(estado.modo === 'game' || estado.modo === 'talk') &&
                <div className="container">
                    <div className="container-game">
                        <CriterHeader 
                            estado={estado} 
                        />

                        <div className="box-game">
                            <Content 
                                smallWidth={smallWidth}
                                comida={comida}
                                estado={estado}

                            />
                            <OptionsMenu 
                                smallWidth={smallWidth}
                                estado={estado}
                                pregunta={pregunta}
                                contestar={contestar} 
                            />
                        </div>

                        <CriterFooter 
                            estado={estado} 
                            pregunta={comida} 
                        />

                    </div>
                    <div className="feedback-bg-container">
                        <div className="feedback-bg" />
                    </div>

                    {/* Personajes */}
                    <CriterFeedback 
                        estado={estado}
                        pregunta={pregunta}
                        continuar={estado.modo === 'talk'?  
                            continuarTuto : continuar
                        }
                    />
                </div>
            }

            <div>
                <Modal
                    show={modalIntro}
                    handleChange={()=>{
                        // Cerrar modal
                        setModalIntro(!modalIntro);
                        // Iniciar Juego
                        tutorial();
                    }}
                >
                    <Instructions />
                </Modal>
            </div>

        </div>
    );
}