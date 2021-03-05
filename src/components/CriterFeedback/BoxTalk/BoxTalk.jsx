import classNames from 'classnames'
import "./BoxTalk.css"

export default ({
    escena = "feedback",
    modo,
    title = "",
    text,
    onClick
}) => {

    return (
        <div
            className="boxTalk-container"
            onClick={onClick}
        >
            <div className={classNames({
                [`boxTalk-${modo === "talk" ? 'feedback' : escena}`]: true,
            })}>
                { title && 
                    <div className="titulo-container">
                        <div className="titulo">
                            { title } 
                        </div>
                    </div>
                }

                <div className="text-container">
                    <div className="text">
                        { text }
                    </div>
                </div>
                {(modo === 'talk' || escena === 'feedback') &&
                    <div 
                        className="btn-container"
                    >
                        <div className="btn">
                            siguiente <span className="fl"></span>
                        </div>
                    </div>
                }
            </div>
            <div className="boxTalk-fl-container">
                <div className="boxTalk-fl" />
            </div>
        
        </div>
    )
}