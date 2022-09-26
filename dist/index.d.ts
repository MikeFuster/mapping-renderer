declare const MappingRendererControl: {
    tester: any;
    renderer: any;
};

declare const SourceTableControl: {
    tester: any;
    renderer: any;
};

declare const TransformedTableControl: {
    tester: any;
    renderer: any;
};

declare const getKeyByUiSchemaType: (uischema: any, type: string) => null;
declare const createSchema: ({ source, target, uischema, dataToTransform, }: {
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
declare const createRecipe: (data: any) => any;
declare const transformData: (data: any, sourceData: any) => any;

declare const sdk_d_getKeyByUiSchemaType: typeof getKeyByUiSchemaType;
declare const sdk_d_createSchema: typeof createSchema;
declare const sdk_d_createRecipe: typeof createRecipe;
declare const sdk_d_transformData: typeof transformData;
declare namespace sdk_d {
  export {
    sdk_d_getKeyByUiSchemaType as getKeyByUiSchemaType,
    sdk_d_createSchema as createSchema,
    sdk_d_createRecipe as createRecipe,
    sdk_d_transformData as transformData,
  };
}

export { MappingRendererControl, SourceTableControl, TransformedTableControl, sdk_d as sdk };
