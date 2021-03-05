import classNames from 'classnames'
import "./Content.css";

import imgPyramid from '../../assets/vectores/VEC_PIRAMIDE_2.svg'

import food_1 from "../../assets/comidas/COMIDA_1.svg"
import food_2 from "../../assets/comidas/COMIDA_2.svg"
import food_3 from "../../assets/comidas/COMIDA_3.svg"
import food_4 from "../../assets/comidas/COMIDA_4.svg"
import food_5 from "../../assets/comidas/COMIDA_5.svg"

export default ({ smallWidth, comida, estado })=> {

    const imgFood = () => {
        switch(comida.id){
            case 1: return food_1;
            case 2: return food_2;
            case 3: return food_3;
            case 4: return food_4;
            case 5: return food_5;
        }
    }

    const ContentImgFood = () => {
        return (
            <div className="bg-table">
                <img 
                    src={imgFood()} 
                    alt=""
                    className="img-dishes"
                />
            </div>
        )
    }

    const Welcome = () => {
        return (
            <BackgroundFood>
                <div className="welcome-content">
                    <div>
                        ALIMENTACION SALUDABLE
                    </div>
                </div>
            </BackgroundFood>
        )
    }

    const FeedbackEnd = () => {
        return (
            <BackgroundFood>
                <div className="bg-food-contentText">
                    <div className="bg-food-text">HAS CONSEGUIDO</div>
                    <div className="bg-food-textInfo">¡{estado.puntaje} SEMILLAS!</div>
                    <div className="bg-food-message">
                        <div className="bg-food-message-text">
                            PARA CULTIVAR UN MEJOR FUTURO
                        </div>
                    </div>
                </div> 
            </BackgroundFood>
        )
    }

    const BackgroundFood = ({children}) => {
        return (
            <div className="bg-food-container">
                <div className="bg-food-top" />
                <div className="bg-food-content" >

                    <div className="bg-food-containerText">
                        <div className="bg-food-line-top" />
                        {children}
                        <div className="bg-food-line-bottom" />
                    </div>

                </div>
                <div className="bg-food-bottom" />
            </div>

        )
    }

    const Pyramid = () => {
        return (
            <div className="imgPyramid">
                <img 
                    src={imgPyramid} 
                    alt=""
                />
            </div>
        )
    }

    const showContent = () => {
        switch(estado.modo){
            case "game":
                return <ContentImgFood />;
            case "talk": {
                switch(estado.escena){
                    case "intro":
                        return <Welcome />
                    case "pyramid":
                        return <Pyramid />
                    case 'feedbackEnd':
                        return <FeedbackEnd />
                }
            }

        }
    }

    return (
        <div 
            id="content" 
            className={classNames({
                "content": true,
                "contentSmall": smallWidth
            })}
        >
            {showContent()}
        </div>
    )
};