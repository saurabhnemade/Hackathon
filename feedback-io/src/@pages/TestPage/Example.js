import React, { Component, Fragment } from "react";
import Element from "./Element";
import DropZone from "./DropZone";
import { Container, Draggable } from 'react-smooth-dnd';
import RecursiveContainer from "../../@components/RecursiveContainer";
import filter from "lodash/filter";
import cloneDeep from "lodash/cloneDeep"

export default class Example extends Component {
    render() {
        return (
            <div>
                Example Component
                <Element test={1}/>

                <DropZone/>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.sourceRef = React.createRef();
        this.targetRef = React.createRef();
        this.state = {
            targetElements : []
        }
    }

    onDrop = (options) => {
        console.log(options);
        const {addedIndex, payload, removedIndex} = options;
        let elements = [...this.state.targetElements];
        if (removedIndex !== null && addedIndex!==null) {
            let movedElement = { ...this.state.targetElements[removedIndex]};
            let modifiedArray = filter(cloneDeep(this.state.targetElements), (n,i) => i!==removedIndex);

            modifiedArray.splice(addedIndex,0,movedElement);
            this.setState({
                targetElements: modifiedArray
            });
        } else {
            if (addedIndex==null || addedIndex==undefined) {

            }
             else{
                elements.push({
                    name: "Test"+ Date.now(),
                    key: "dynamic" + Date.now(),
                    type: payload.type
                });
                this.setState({
                    targetElements: elements
                });
            }
        }

    }

    searchTree = (element, key, value) => {
        if(element[key] == value){
            return element;
        }else if (element.children != null){
            var i;
            var result = null;
            for(i=0; result == null && i < element.children.length; i++){
                result = this.searchTree(element.children[i], key, value);
            }
            return result;
        }
        return null;
    }

    onDropInside = (key, options) => {
        console.log("inside payload");
        console.log(options);
        console.log(key)
        const currentElements = cloneDeep(this.state.targetElements);
        const data = {
            children: currentElements
        }
        let found = this.searchTree(data, "key", key);
        if (!found.children) {
            found.children=[];
        }
        // console.log(found);
         console.log(options);


        const {addedIndex, payload, removedIndex} = options;
        if (removedIndex !== null && addedIndex!==null) {
            //Movment of nodes within a container
            let movedElement = { ...found.children[removedIndex]};
            let modifiedArray = filter(found.children, (n,i) => i!==removedIndex);

            modifiedArray.splice(addedIndex,0,movedElement);
            found.children = modifiedArray;
        }
        else {
            if (addedIndex===null || addedIndex===undefined) {

            }
            else{
                let newEl = {
                    name: "Test"+ Date.now(),
                    key: "dynamic" + Date.now(),
                    type: payload.type
                }
                console.log(newEl);
                found.children.push(newEl)
                console.log(found);
            }
        }

        console.log(found);
        console.log(data.children);

        this.setState({
            targetElements: data.children
        });
    }

    search = (key, parent) => {
        const stack = [ parent ]
        while (stack.length) {
            const node = stack.pop()
            if (node.key === key) return node
            stack.push(...node.children)
        }
        return stack.pop() || null
    };

    renderCategoryItem = (type) => {
        return (
            <Draggable style={{padding: 10, margin: 5, border: "1px dashed #dedede", backgroundColor: "#eaeaea", maxWidth: 200}} >
                {type}
            </Draggable>
        );
    }

    getCategoryItems = () => {
        return [
            {
                name: "Textfield",
                payload: {
                    type: "textfield"
                }
            },
            {
                name: "Text Area",
                payload: {
                    type: "textarea"
                }
            },
            {
                name: "Color",
                payload: {
                    type: "color"
                }
            },
            {
                name: "Checkbox",
                payload: {
                    type: "checkbox"
                }
            },
            {
                name: "Telephone number",
                payload: {
                    type: "tel"
                }
            },

            {
                name: "Radio Button",
                payload: {
                    type: "radio"
                }
            },
            {
                name: "Date",
                payload: {
                    type: "date"
                }
            },

            {
                name: "Email",
                payload: {
                    type: "email"
                }
            },

            {
                name: "Image",
                payload: {
                    type: "image"
                }
            },

            {
                name: "Number",
                payload: {
                    type: "number"
                }
            },
            {
                name: "Password",
                payload: {
                    type: "password"
                }
            },
            {
                name: "Range",
                payload: {
                    type: "range"
                }
            },
            {
                name: "Reset",
                payload: {
                    type: "reset"
                }
            },
            {
                name: "Submit",
                payload: {
                    type: "submit"
                }
            },
            {
                name: "Row",
                payload: {
                    type: "row",
                    hasChildren: true
                }
            }
        ];
    };

    getCategoryPayload = (index) => {
        const categoryItem = this.getCategoryItems()[index];
        return categoryItem.payload;
    }

    render() {
        const items = []
        console.log(this.state);
        return (
            <>
                <div style={{display: "flex", flexDirection: "row", height: "calc(100vh - 50px)"}}>
                    <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Container groupName="1" onDrop={this.onDrop} style={{ width: 400, height: 600, display: "block", alignItems: "center", overflow: "auto", boxShadow: "10px 13px 36px 0px rgba(0,0,0,0.75)"}}>
                            {this.state.targetElements.length === 0
                                ? <div className={"centerFlex"}>Drag and drop</div>
                                : <RecursiveContainer config={this.state.targetElements} onDropInside={this.onDropInside}/>
                            }
                        </Container>
                        <div>
                            Powered by Velotio
                        </div>
                    </div>
                    <div style={{borderLeft: "1px solid black", width: 400}}>
                        Container Style
                    </div>
                    <div style={{width: 250, paddingLeft: 10, borderLeft: "1px solid black"}}>
                        <Container groupName="1" getChildPayload={this.getCategoryPayload} behaviour={"copy"} onDrop={this.onDrop}>
                            {this.getCategoryItems().map((category,idx) => {
                                return (<Fragment key={idx}>
                                    {this.renderCategoryItem(category.name)}
                                    </Fragment>);
                            })}
                        </Container>
                    </div>
                </div>
            </>
        )
    }
}