import React, { Component } from "react";
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Example from "./Example";


class TestPage extends Component {
    render() {
        return (
            <>
                <DragDropContextProvider backend={HTML5Backend}>
                    <Example />
                </DragDropContextProvider>
            </>
        )
    }
}

export default TestPage;