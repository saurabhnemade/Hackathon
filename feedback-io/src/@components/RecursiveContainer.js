import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Draggable, Container} from "react-smooth-dnd";

export default class RecursiveContainer extends Component {
    static propTypes = {
        config: PropTypes.array
    };

    getItem = (item) => {
        //console.log(item);
        //item.type = "reset"
        if (item.type == "checkbox") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"checkbox"} />
                </Draggable>
            )
        }
        if (item.type == "date") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"date"} />
                </Draggable>
            )
        }
        if (item.type == "email") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"email"} />
                </Draggable>
            )
        }
        if (item.type == "image") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"image"} />
                </Draggable>
            )
        }
        if (item.type == "number") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"number"} />
                </Draggable>
            )
        }
        if (item.type == "password") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"password"} />
                </Draggable>
            )
        }
        if (item.type == "radio") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"radio"} />
                </Draggable>
            )
        }
        if (item.type == "range") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"range"} />
                </Draggable>
            )
        }
        if (item.type == "reset") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"reset"} />
                </Draggable>
            )
        }
        if (item.type == "submit") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"submit"} />
                </Draggable>
            )
        }
        if (item.type == "tel") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"tel"} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                </Draggable>
            )
        }
        if (item.type == "textarea") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <textarea rows="10" cols="30"/>
                </Draggable>
            )
        }
        if (item.type == "color") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"color"} />
                </Draggable>
            )
        }
        if (item.type == "textfield") {
            return (
                <Draggable style={{border: "1px dashed black", padding: 10}}>
                    <input type={"text"} />
                </Draggable>
            )
        }
        if (item.type == "row") {
            console.log(item)
            const insideDrop = (options) => {
                this.props.onDropInside(item.key, options);
            }
            return (
                <>
                    <Container orientation="horizontal" groupName="1" onDrop={insideDrop} style={{ border: "1px dashed green", display: "flex", padding: 1}}>
                        {item.children && item.children.length > 0 &&
                            <RecursiveContainer config={item.children} onDropInside={this.props.onDropInside}/>
                        }
                        {(item.children === undefined || item.children.length === 0) &&
                            <div className={"centerFlex"}>Empty row</div>
                        }
                    </Container>

                </>

            )
        }
    }
    itemRenderer = (item, key) => {
        return (
            <Fragment key={`recursive-${key}`} >
                <Fragment>
                    {this.getItem(item)}
                </Fragment>
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