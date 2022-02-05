import RulePart from "./RulePart";

let crutch = 0;

function StartScreen() {
    const hidden = () => {
        document.querySelector(".start-screen")!.classList.add("none");
        if(crutch++ > 0)
            document.body.classList.remove("hidden");
    }
    return(
        <div className="start-screen">
            <img className="start-screen__logo" src="./logo.svg" alt="logo" />
            <h1 className="start-screen__title">Tupunga is a game about evolution</h1>
            <p className="start-screen__text">Watch the most efficient organism that has evolved</p>
            <h2 className="start-screen__rule-title">Rule</h2>
            <p className="start-screen__text">At the beginning of the game, an organism appears, consisting of parts that give certain characteristics.</p>
            <p className="start-screen__text">If the body eats the required amount of food, its exact or “improved” copy will appear in the same place.</p>
            <p className="start-screen__text">The goal of the game is to observe the development of cells depending on the initial environment.</p>
            <div className="part">
                <RulePart color="#55d98c" description="Plant🌿" />
                <RulePart color="#e74c3c" description="Meat🍖<br>After a while, it turns into rot🦴" />
                <RulePart color="#95a5a6" description="Rot🦴<br>After a while, it turns into plant🌿" />

                <RulePart color="#8e44ad" description="Allows the body to reproduce🐇" />

                <RulePart color="#27ae60" description="Allows you to eat plant🌿<br>Gives a bonus to speed💨" />
                <RulePart color="#c0392b" description="Allows you to eat meat🍖<br>
                    Allows you to eat other organisms if attack⚔ > defense⛨<br>
                    (Parent does not eat child. Child does not eat parent)<br>
                    Gives a bonus to attack⚔" />
                <RulePart color="#34495e" description="Allows you to eat rot🦴<br>Gives a bonus to defense⛨" />

                <RulePart color="#ff00ff" description="Gives a bonus to attack⚔" />
                <RulePart color="#f1c40f" description="Gives a bonus to defense⛨" />
                <RulePart color="#3498db" description="Gives a bonus to speed💨" />
            </div>
            <button className="button start-screen__button" onClick={hidden}>Ok</button>
        </div>
    );
}

export default StartScreen;