export declare const createSchema: ({ source, target, uischema, dataToTransform, }: {
    source: any;
    target: any;
    uischema: any;
    dataToTransform: any;
}) => {
    schema: {
        type: string;
        properties: any;
    };
    data: {
        [x: number]: any;
        baseKeys: {
            dynamicObjectKey: any;
        };
    };
};
export declare const createRecipe: (data: any) => any;
export declare const transformData: (data: any, sourceData: any) => any;
