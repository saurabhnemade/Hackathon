import React, { Component } from "react";
import { DragSource } from 'react-dnd'
import ItemTypes from "./ItemTypes";

class Element extends Component {
    render() {
        const { connectDragSource } = this.props;
        return connectDragSource((
            <div>
                Custom Element
            </div>
        ))
    }
}

Element.defaultProps = {
    example: 11
}

export default DragSource(
    ItemTypes.ELEMENT,
    {
        beginDrag: () => ({}),
    },
    connect => ({
        connectDragSource: connect.dragSource(),
    })
)(Element);