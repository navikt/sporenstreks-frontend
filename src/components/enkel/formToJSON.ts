const formToJSON = (elms) =>
    [].reduce.call(elms, (data: any, elm: any) => {
        data[elm.name] = elm.value;
        return data;
    }, {});

export default formToJSON;
