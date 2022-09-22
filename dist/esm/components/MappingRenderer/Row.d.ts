/// <reference types="react" />
interface Enum {
    value: string;
    label?: string;
}
interface Props {
    source: Enum;
    targetEnum: Enum[];
    onChange: (source: string, target: Enum) => void;
}
declare const Row: ({ source, targetEnum, onChange }: Props) => JSX.Element;
export default Row;
