import { ChangeEvent, useState } from "react";
import config from "../config";
import SettingItem from "./SettingItem";

interface Props {
    setSettingActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Setting({setSettingActive}:Props) {
    const [active, setActive] = useState(false);
    const toggleActive = () => setActive(!active);

    const [startCellValue, setStartCellValue] = useState("vertical");
    const changeStartCellValue = (e: ChangeEvent) => setStartCellValue((e.target as HTMLSelectElement).value);


    function setConfig() {
        const sizeCell = parseFloat(document.querySelector<HTMLInputElement>("#sizeCell")!.value);
        if(sizeCell) {
            config.sizeCell = sizeCell;
            config.numberCells = Math.floor(config.fieldSize / config.sizeCell);
        }
        const childrenToDeath = parseFloat(document.querySelector<HTMLInputElement>("#childrenToDeath")!.value);
        if(childrenToDeath) config.childrenToDeath = childrenToDeath;
        config.startCell = startCellValue;

        const inputs = document.querySelectorAll<HTMLInputElement>(".setting__input");
        inputs.forEach(input => {
            if(input.value) {
                const value = parseFloat(input.value);
                if(isNaN(value)) return;

                config[input.id] = value;
                input.value = "";
            }
        });
        setStartCellValue("vertical");
        setSettingActive(false);
        document.querySelector(".setting")!.classList.add("none");
    }
    return(
    <div className="setting">
        <h2 className="setting__title">Settings</h2>
        <p className="setting__text">Using settings within the specified limits will not lead to errors, however, you can go beyond the limit and specify ANY number😈</p>
        <div className="setting__wraper">
            <div className="setting__container">
                <h3>Main Settings</h3>
                <table className="setting__main setting__table">
                <tbody>
                    <tr>
                        <td>startCell</td>
                        <td>
                            <select className="setting__select" name="startCell" value={startCellValue} onChange={changeStartCellValue}>
                                <option value="vertical">Vertical</option>
                                <option value="horizontal">Horizontal</option>
                                <option value="square">Square</option>
                                <option value="tiny">Tiny</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <SettingItem
                        title="sizeCell"
                        placeholder="10"
                        description="Integer from 1 to 100"/>
                    <SettingItem
                        title="childrenToDeath"
                        placeholder="0"
                        description="Integer from 0 to 2"/>
                </tbody>
                </table>
                <h3 onClick={toggleActive} className="setting__additional-title"><span className={"setting__triangle " + (active ? "active " : "")}>▸</span> Additional Settings (click me!)</h3>
                <table className={"setting__additional setting__table "  + (active ? "active " : "")}>
                <tbody>
                    <SettingItem
                        title="minLife"
                        placeholder="150"
                        description="Integer from 0 to 1000"/>
                    <SettingItem
                        title="bonusLifeFromPart"
                        placeholder="100"
                        description="Integer from 0 to 1000"/>
                    <SettingItem
                        title="stopSpeedFromPart"
                        placeholder="2"
                        description="Integer from 0 to 100"/>
                    <SettingItem
                        title="plantSpawnChance"
                        placeholder="0.3"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="chanceEvolution"
                        placeholder="0.75"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="chanceAddPart"
                        placeholder="0.33"
                        description="From 0 to 1 | chance = Add/(Add+Delete+Change)"/>
                    <SettingItem
                        title="chanceDeletePart"
                        placeholder="0.33"
                        description="From 0 to 1 | chance = Delete/(Add+Delete+Change)"/>
                    <SettingItem
                        title="chanceChangePart"
                        placeholder="0.33"
                        description="From 0 to 1 | chance = Change/(Add+Delete+Change)"/>
                    <SettingItem
                        title="chanceMoveUp"
                        placeholder="0.25"
                        description="From 0 to 1 | chance = Up/(Up+Right+Down+Left)"/>
                    <SettingItem
                        title="chanceMoveRight"
                        placeholder="0.25"
                        description="From 0 to 1 | chance = Right/(Up+Right+Down+Left)"/>
                    <SettingItem
                        title="chanceMoveDown"
                        placeholder="0.25"
                        description="From 0 to 1 | chance = Down/(Up+Right+Down+Left)"/>
                    <SettingItem
                        title="chanceMoveLeft"
                        placeholder="0.25"
                        description="From 0 to 1 | chance = Left/(Up+Right+Down+Left)"/>
                    <SettingItem
                        title="movementChange"
                        placeholder="0.05"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="cellNutrition"
                        placeholder="0.6"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="meatSpoilageTime"
                        placeholder="200"
                        description="Integer from 0 to 10000"/>
                    <SettingItem
                        title="rotSpoilageTime"
                        placeholder="600"
                        description="Integer from 0 to 10000"/>
                    <SettingItem
                        title="minSpeedPart"
                        placeholder="1.1"
                        description="From 0 to 2"/>
                    <SettingItem
                        title="maxSpeedPart"
                        placeholder="1.4"
                        description="From 0 to 2"/>
                    <SettingItem
                        title="minAttackPart"
                        placeholder="0.8"
                        description="From 0 to 2"/>
                    <SettingItem
                        title="maxAttackPart"
                        placeholder="1.1"
                        description="From 0 to 2"/>
                    <SettingItem
                        title="minDefensePart"
                        placeholder="0.5"
                        description="From 0 to 2"/>
                    <SettingItem
                        title="maxDefensePart"
                        placeholder="0.8"
                        description="From 0 to 2"/>
                    
                    <SettingItem
                        title="speedBonusEaterPlant"
                        placeholder="0.3"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="attackBonusEaterMeat"
                        placeholder="0.1"
                        description="From 0 to 1"/>
                    <SettingItem
                        title="defenseBonusEaterRot"
                        placeholder="0.08"
                        description="From 0 to 1"/>
                </tbody>
                </table>
            </div>
        </div>
        <div className="setting__buttons-container">
            <button className="button setting__next" onClick={setConfig}>
                Apply
            </button>
        </div>    
    </div>
    );
}

export default Setting;