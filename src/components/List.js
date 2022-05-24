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
    const renderItem = () => {
        // if (keys) {
        //     return keys.map((key) => {
        //         if (key === "display_groups")
        //             return;
    
        //         return items[key].map((item) => {
        //             if (key === 'events') {
        //                 const primaryPerformerImg = item.performers.find(x => x.id === item.event.performers[0].id)["hero_image_url"]

        //                 return (<ListItem key={item.event.id} image={primaryPerformerImg} title={item.event.name} subtitle={item.venue.name}/>)
        //             } else if (key === 'performers') {
        //                 return (<ListItem key={item.id}image={item["hero_image_url"]} title={item.name} subtitle={item.category.toUpperCase()}/>)
        //             } else if (key === 'venues') {
        //                 return (<ListItem key={item.id} image={item["image_url"]} title={item.name} subtitle={item.city}/>)
        //             }

        //             return null;
        //         })
        //     })  
        // }

        return items.map((val, i) => {
            console.log(val)

            let image, title, subtitle = null;

            if (val.event) {
                image = val["performers"].find(x => x.id === val.event.performers[0].id)["hero_image_url"]
                title = val["event"].name
                subtitle = val["venue"].name
            } else {
                if (val["hero_image_url"]) {
                    image = val["hero_image_url"]
                    title = val["name"]
                    subtitle = val["category"].toUpperCase()
                } else {
                    image = val['image_url']
                    title = val['name']
                    subtitle = val['city']
                }
            }

            return (<ListItem key={i} image={image} title={title} subtitle={subtitle}/>)
        })

    }

    if (!items) 
        return null;

    const empty = items.length === 0;

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