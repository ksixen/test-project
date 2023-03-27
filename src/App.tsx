import React from "react";
import ParamEditor from "./ParamEditor";
const initParams = [
    {
        id: 1,
        name: "Назначение",
        type: "purpose",
    },
    {
        id: 2,
        name: "Длина",
        type: "size",
    },
];
const model = {
    paramValues: [
        {
            paramId: 1,
            id: 1,
            value: "повседневное",
        },
        {
            paramId: 1,
            id: 2,
            value: "повседневное",
        },
        {
            paramId: 1,
            id: 3,
            value: "повседневное",
        },
        {
            paramId: 2,
            id: 4,
            value: "макси",
        },
    ],
};
const App = () => {
    const get = new ParamEditor({model: model, params: initParams})
    console.log(get.getModel())
    return (
        <>
            {get.render()}
        </>
    );
};

export default App;
