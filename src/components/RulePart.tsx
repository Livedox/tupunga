interface Props {
    color: string;
    description: string;
}

function RulePart({color, description}:Props) {
    return(
        <div className="part__container">
            <div className="part__color" style={{background: color}} />
            <p className="part__description" dangerouslySetInnerHTML={{__html: description}} />
        </div>
    );
}

export default RulePart;