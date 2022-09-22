export declare const createSchema: ({ source, target, dataToTransform, }: {
    source: any;
    target: any;
    dataToTransform: any;
}) => {
    schema: {
        type: string;
        properties: {
            keys: {
                type: string;
                items: {
                    type: string;
                    required: string[];
                    properties: {
                        source: {
                            type: string;
                            title: any;
                            enum: any;
                        };
                        target: {
                            type: string;
                            title: any;
                            enum: any;
                        };
                    };
                };
            };
            dataToTransform: any;
        };
    };
    data: {
        keys: any;
    };
};
export declare const createRecipe: (data: any) => any;
