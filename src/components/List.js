import { useEffect, useState } from 'react';
import './List.css';

const ListItem = ({ title, subtitle, image }) => {
    return (
        <li className={'Item'}>
            <img src={image} />
            <div>
                <b>{title}</b><small>{subtitle}</small>
            </div>
        </li>
    )
}

const List = ({ items, searchQuery }) => {
    const [keys, setKeys] = useState()

    useEffect(() => {
        if (items) {
            const itemKeys = Object.keys(items)

            setKeys(itemKeys)
        }
    }, [items])

    const renderItem = () => {
        if (keys) {
            return keys.map((key) => {
                if (key === "display_groups")
                    return;
    
                return items[key].map((item) => {
                    if (key === 'events') {
                        const primaryPerformerImg = item.performers.find(x => x.id === item.event.performers[0].id)["hero_image_url"]

                        return (<ListItem key={item.event.id} image={primaryPerformerImg} title={item.event.name} subtitle={item.venue.name}/>)
                    } else if (key === 'performers') {
                        return (<ListItem key={item.id}image={item["hero_image_url"]} title={item.name} subtitle={item.category.toUpperCase()}/>)
                    } else if (key === 'venues') {
                        return (<ListItem key={item.id} image={item["image_url"]} title={item.name} subtitle={item.city}/>)
                    }

                    return null;
                })
            })  
        }
    }

    if (!items) 
        return null;

    const empty = items === null || items.events.length + items.performers.length + items.venues.length === 0;

    return (
        <nav className={"ListNav"}>
            <ul className={"ListContainer"}>
                {empty && (<h2>{`We are not able to find any results with "${searchQuery}"`}</h2>)}
                {!empty && renderItem()}
            </ul>
        </nav>
    )
}

export default List;