import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Draggable} from "react-smooth-dnd";

export default class RecursiveContainer extends Component {
    static propTypes = {
        config: PropTypes.array
    };

    getItem = (item) => {
        //console.log(item);
        item.type = "reset"
        if (item.type == "checkbox") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"checkbox"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "date") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"date"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "email") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"email"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "image") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"image"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "number") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"number"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "password") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"password"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "radio") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"radio"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "range") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"range"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "reset") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"reset"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "submit") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"submit"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "tel") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"tel"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "textarea") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"color"} defaultValue={item.name}/>
                </Draggable>
            )
        }
        if (item.type == "textfield") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"text"} defaultValue={item.name}/>
                </Draggable>
            )
        }
    }
    itemRenderer = (item, key) => {
        return (
            <Fragment key={key} >
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