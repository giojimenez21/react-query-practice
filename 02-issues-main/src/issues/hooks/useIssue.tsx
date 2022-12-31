import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githupApi";
import { Issue } from "../interfaces/issue";

export const getIssueInfo = async(issueNumber: number):Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

export const getIssueComments = async(issueNumber: number):Promise<Issue[]> => {
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(["issue", issueNumber], () =>
        getIssueInfo(issueNumber)
    );

    const issueCommentsQuery = useQuery(
        ["issue", issueNumber, "comments"],
        () => getIssueComments(issueQuery.data?.number!),
        {
            enabled: !!issueQuery.data
        }
    );

    return {
        issueQuery,
        issueCommentsQuery
    }
}