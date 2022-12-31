import { FC } from "react";
import { useLabels } from "../hooks/useLabels";

interface IProps {
    selectedLabels: string[];
    onChange: (labelName: string) => void;
}

export const LabelPicker: FC<IProps> = ({ selectedLabels, onChange }) => {
    const labelsQuery = useLabels();

    if (labelsQuery.isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {labelsQuery.data?.map((label) => (
                <span
                    key={label.id}
                    className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) && "label-active"}`}
                    style={{
                        border: `1px solid #${label.color}`,
                        color: `#${label.color}`,
                    }}
                    onClick={() => onChange(label.name)}
                >
                    {label.name}
                </span>
            ))}
        </>
    );
};
