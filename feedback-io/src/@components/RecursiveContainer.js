import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Draggable} from "react-smooth-dnd";

export default class RecursiveContainer extends Component {
    static propTypes = {
        config: PropTypes.array
    };

    getItem = (item) => {
        return (
            <Draggable style={{border: "1px dashed black", padding: 10}}>
                <input type={"text"} value={item.name}/>
            </Draggable>
        )
    }

    itemRenderer = (item, key) => {
        return (
            <Fragment key={`recursive-${key}`} >
                <Fragment>
                    {this.getItem(item)}
                </Fragment>
                {item.children && item.children.length > 0 &&
                    <RecursiveContainer config={item.children} />
                }
            </Fragment>
        );
    }

    render() {
        return (
            <>
                {this.props.config.map((item, key) => {
                    return this.itemRenderer(item, key);
                })}
            </>
        );
    }
}