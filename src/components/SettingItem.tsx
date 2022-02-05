interface Props{
    title: string;
    placeholder: string;
    description: string;
}

function SettingItem({title, placeholder, description}:Props) {
    return(
        <tr>
            <td>{title}</td>
            <td><input className="setting__input" id={title} placeholder={placeholder} /></td>
            <td>{description}</td>
        </tr>
    );
}

export default SettingItem;