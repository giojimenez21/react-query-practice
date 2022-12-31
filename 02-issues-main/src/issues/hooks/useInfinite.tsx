import { Issue, State } from "../interfaces/issue";
import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githupApi";

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

interface QueryProps {
    pageParam?: number;
    queryKey: (string | Props)[];
}

const getIssues = async({ pageParam = 1, queryKey }: QueryProps):Promise<Issue[]> => {

    const [,,args] = queryKey;
    const { state, labels } = args as Props;

    const params = new URLSearchParams();
    if ( state ) params.append('state', state);

    if( labels.length > 0 ) {
        const labelStrings = labels.join(',');
        params.append('labels', labelStrings);
    }

    params.append('page', pageParam.toString());
    params.append('per_page', '5');

    const { data } = await githubApi.get<Issue[]>('/issues', { params });
    return data;
}

export const useInfinite = ({ state, labels }: Props) => {
    const issuesQuery = useInfiniteQuery(
        ['issues','infinite', { state, labels }],
        (data) => getIssues( data ),
        {
            getNextPageParam: (lastPage, pages) => {
                if( lastPage.length === 0 ) return;

                return pages.length + 1;
            }
        }
    )

    return {
        issuesQuery
    }
}
