import { useEffect, useLayoutEffect, useState } from "react";
import Cell from "./Cell";
import CellDyer from "./CellDyer";
import config, { defConfig } from "./config";
import Food, { Plant, Rotting } from "./Food";
import FoodDyer from "./FoodDyer";
import KeyKeyValueMap from "./KeyKeyValueMap";
import Part, { Breeder, PlantEater, Speed } from "./Part";
import Setting from "./components/Setting";
import StartScreen from "./components/StartScreen";
import Footer from "./components/Footer";

function App() {
    const [settingActive, setSettingActive] = useState(true);

    useLayoutEffect(() => {
        if(localStorage.getItem("theme")) {
            document.body.classList.add("dark");
        }
    });

    let render: () => void;
    useEffect(() => {
        const field = document.querySelector<HTMLCanvasElement>(".game__field")!;
        field.width = config.fieldSize;
        field.height = config.fieldSize;
        const ctxField = field.getContext("2d")!;

        const food = document.querySelector<HTMLCanvasElement>(".game__food")!;
        food.width = config.fieldSize;
        food.height = config.fieldSize;
        const ctxFood = food.getContext("2d")!;

        const cellDyer = new CellDyer(ctxField);
        const foodDyer = new FoodDyer(ctxFood);


        const foods = new KeyKeyValueMap<Food>();
        for(let i = 0; i < config.numberCells; ++i) {
            for(let j = 0; j < config.numberCells; ++j) {
                if(Math.random() < config.plantSpawnChance) foods.set(i, j, new Plant());
            }
        }

        const parts: KeyKeyValueMap<Part> = new KeyKeyValueMap<Part>();
        parts.set(0, 0, new PlantEater());
        if(config.startCell === "horizontal") {
            parts.set(1, 0, new Breeder());
            parts.set(2, 0, new Speed());
        } else if(config.startCell === "square") {
            parts.set(1, 0, new Breeder());
            parts.set(0, 1, new Breeder());
            parts.set(1, 1, new Speed()); 
        } else if (config.startCell === "tiny") {
            parts.set(0, 1, new Breeder());
        } else { 
            parts.set(0, 1, new Breeder());
            parts.set(0, 2, new Speed());
        }
        
        const cells = [new Cell(parts)];
        render = () => {
            cells.forEach((cell, i) => {
                cell.step(foods, cells);
                if(cell.checkIsDie()) cells.splice(i, 1);
            });

            foods.forEach((item, x, y) => {
                if(item instanceof Rotting) {
                    if(item.spoil()) {
                        foods.set(x, y, item.new(item.value));
                    }
                }
            });
            cellDyer.paint(cells);
            foodDyer.paint(foods);
        };
        render();
    });

    useEffect(() => {
        if (settingActive)
            document.body.classList.add("hidden");
        else
            document.body.classList.remove("hidden");
    }, [settingActive]);


    let interval: NodeJS.Timer;
    const next = () => render(); 
    const stop = () => clearInterval(interval);
    const setRender = (speed: number) => () => {
        stop();
        interval = setInterval(render, 1000/speed);
    }
    
    const download = () => {
        var link = document.createElement("a");
        link.download = "tupunga.png";
        const food = document.querySelector<HTMLCanvasElement>(".game__food")!;
        const field = document.querySelector<HTMLCanvasElement>(".game__field")!;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = config.fieldSize;
        canvas.height = config.fieldSize;
        ctx.drawImage(food, 0, 0);
        ctx.drawImage(field, 0, 0);
        link.href = canvas.toDataURL();
        link.click();
    }

    const showStartScreen = () => {
        document.querySelector(".start-screen")!.classList.remove("none");
        document.body.classList.add("hidden");
    }
    const showSetting = () => {
        document.querySelector(".setting")!.classList.remove("none");
        for(let key in config) {
            config[key] = defConfig[key];
        }
        stop();
        setSettingActive(true);
    }

    const changeTheme = () => {
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.removeItem("theme");
        }
    }
    return (
        <div className="App">
            <StartScreen />
            <Setting setSettingActive={setSettingActive} />
            <div className="main">
                <div>
                    <header className="header">
                        <a className="header__logo-link" href="./">
                            <img className="header__logo" src="./logo.svg" alt="logo" />
                        </a>
                        <div className="header__container">
                            <button className="header__button" onClick={showStartScreen}>Rule</button>
                            <button className="header__button" onClick={showSetting}>Restart</button>
                            <button className="header__moon" onClick={changeTheme}></button>
                        </div> 
                    </header>
                    <div className="game__buttons">
                        <button className="game__button" onClick={stop}>Stop</button>
                        <button className="game__button" onClick={next}>Next</button>
                        <button className="game__button" onClick={setRender(1)}>x1</button>
                        <button className="game__button" onClick={setRender(10)}>x10</button>
                        <button className="game__button" onClick={setRender(100)}>x100</button>
                        <button className="game__button" onClick={setRender(500)}>x500</button>
                        <button className="game__button" onClick={setRender(1000)}>x1000</button>
                        <button className="game__button" onClick={download}>Download</button>
                    </div>
                </div>
                <div className="game">
                    <div className="game__container">
                        <div className="game__canvas">
                            <canvas className="game__field" />
                            <canvas className="game__food" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
