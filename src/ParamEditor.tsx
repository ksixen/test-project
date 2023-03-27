import React, { useState } from "react";
interface Param {
    id: number;
    name: string;
    type: string;
}
interface ParamValue {
    paramId: number;
    value: string;
    id: number;
}
interface Model {
    paramValues: ParamValue[];
    /** colors:  Color[] */
}
interface Props {
    params: Param[];
    model: Model;
}
interface ParamEditorState {
    model: Record<number, Model["paramValues"]>;
}

class ParamEditor extends React.Component<Props, ParamEditorState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: this.splitProps(),
        };
    }
    public getModel(): Model {
        let paramValues: ParamValue[] = [];
        Object.keys(this.state.model).forEach((val) => {
            paramValues = paramValues.concat(this.state.model[val]);
        });
        return {
            paramValues: paramValues,
        };
    }

    splitProps(): Record<number, Model["paramValues"]> {
        const model = this.props.model;
        const params = this.props.params;

        const item: Record<number, Model["paramValues"]> = {};

        model.paramValues.forEach((value) => {
            const paramIndex = params.findIndex(
                (param) => param.id === value.paramId
            );
            if (paramIndex > -1) {
                if (!item[params[paramIndex].id]) {
                    item[params[paramIndex].id] = [];
                }
                item[params[paramIndex].id].push(value);
            } else {
                console.log("Couldn't find param", value);
            }
        });
        return item;
    }

    render(): React.ReactNode {
        const [state, setState] = useState(this.splitProps());
        const handleChangeInput = (
            newValue: string,
            id: number,
            paramId: number
        ) => {
            const paramsValues = state[paramId];
            const changedItem = paramsValues.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          value: newValue,
                      }
                    : item
            );
            const newState = {
                ...state,
                [paramId]: changedItem,
            };
            setState(newState);
        };
        return (
            <>
                {this.props.params.map((param, paramIndex) => {
                    return (
                        <div key={param.id}>
                            <span>{param.name}</span>
                            <span>
                                {state[param.id].map((item, index) => (
                                    <input
                                        key={`${item.paramId}${index}`}
                                        value={item.value}
                                        onChange={({ target }) => {
                                            handleChangeInput(
                                                target.value,
                                                item.id,
                                                item.paramId
                                            );
                                        }}
                                    />
                                ))}
                            </span>
                        </div>
                    );
                })}
            </>
        );
    }
}
export default ParamEditor;
