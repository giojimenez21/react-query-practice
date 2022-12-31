import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";


export const IssueView = () => {
    const params = useParams();
    const { id = '0' } = params;

    const { issueQuery, issueCommentsQuery } = useIssue( +id );

    if(issueQuery.isLoading) {
        return <h1>Loading...</h1>
    }

    if(!issueQuery.isLoading && !issueQuery.data) {
        return <Navigate to="./issues/list"/>
    }

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            {/* Primer comentario */}
            <IssueComment issue={issueQuery.data} />

            {
                issueCommentsQuery.isLoading 
                ? <h1>Loading...</h1> 
                : issueCommentsQuery.data?.map(issue => (
                    <IssueComment key={issue.id} issue={issue}/>
                ))
            }
        </div>
    );
};
