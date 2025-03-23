import { Fragment } from "react/jsx-runtime";
// import { MouseEvent } from "react";
import { useState } from "react";

// Los Props se usan para read only
interface ListGroupProps {
    items: string[];
    heading: string;
    onSelectListItem: (item: string) => void
}

function ListGroup({items, heading, onSelectListItem}: ListGroupProps) {
    
    // Los useState son cosas dinámicas
    const [selectedIndex, setSelectedIndex] = useState(-1)

    // const clickedListItem = (event: MouseEvent) => {
    //     console.log(event.target)
    // }
    
    const getMessage = () => {
        return (items.length === 0 ? 
        //if
        <p>True</p> 
        : //else
        <p>False</p>
        )
        }

    const getMessageOtherWay = () => {
        return (items.length === 0 && 
        //if
        <p>True</p>
        )
        }

    return( 
    <Fragment>
        <h1>{heading}</h1>
        { getMessage() }
        { getMessageOtherWay() }
        <ul>
            {items.map((item, index) => (
                <li 
                className={`ListGroup ${selectedIndex === index ? 'active' : ''}`}
                key={item} 
                onClick={() =>{
                        setSelectedIndex(index);
                        onSelectListItem(item)
                }}
                >
                {item}
                </li>
            ))}
        </ul>
    </Fragment>
    )
}

export default ListGroup;