import './CriterHeader.css';

import vect_intentos from '../../assets/vectores/VECT_INTENTOS.svg'
import vect_fallos from '../../assets/vectores/VECT_FALLOS.svg'
import vect_home from '../../assets/vectores/VECT_HOME.svg'
import vect_piramide from '../../assets/vectores/VEC_BTN_PIRAMIDE.svg'

import BarScore from './BarScore/BarScore'

function CriterHeader({ estado: {intentos, puntaje, puntajeMax} }) {
    return (
        <>
            <div id="header-container">
                <div id="header-icons-info">
                    <div id="">
                        {[...Array(3)].map((x, i) =>
                            <img 
                                src={i < intentos ? vect_intentos : vect_fallos} 
                                className="header_icon" 
                                key={i} 
                            />
                        )}
                    </div>
                </div>
                <div id="header-puntaje">
                    <BarScore 
                        pts={puntaje}
                        ptsMax={puntajeMax}
                    />
                </div>
                <div id="header-icons-menu">
                    <img src={vect_piramide} 
                        className="header_icon" 
                    />
                    <img src={vect_home} 
                        className="header_icon" 
                    />
                </div>
            </div>
        </>
    );
}

export default CriterHeader;
