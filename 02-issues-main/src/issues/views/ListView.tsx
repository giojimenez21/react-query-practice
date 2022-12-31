import { useState } from "react";

import { useInfinite } from "../hooks";
import { State } from "../interfaces/issue";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const [state, setState] = useState<State>();
    const { issuesQuery } = useInfinite({ state, labels: selectedLabels });
    
    const onChangeLabel = (labelName: string) => {
        selectedLabels.includes(labelName)
            ? setSelectedLabels( selectedLabels.filter((label) => label !== labelName))
            : setSelectedLabels([...selectedLabels, labelName]);
    };

    return (
        <div className="row mt-5">
            <div className="col-8">
                {issuesQuery.isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <IssueList
                        issues={issuesQuery.data?.pages.flat() || []}
                        state={state}
                        onStateChanged={(newState) => setState(newState)}
                    />
                )}

                <button
                    className="btn btn-outline-primary mt-3"
                    disabled={ !issuesQuery.hasNextPage }
                    onClick={() => issuesQuery.fetchNextPage()}
                >
                    Load more
                </button>
            </div>

            <div className="col-4">
                <LabelPicker
                    selectedLabels={selectedLabels}
                    onChange={(labelName) => onChangeLabel(labelName)}
                />
            </div>
        </div>
    );
};
