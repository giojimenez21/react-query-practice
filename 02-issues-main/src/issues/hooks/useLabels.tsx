import { Label } from "../interfaces/label";
import { githubApi } from "../../api/githupApi";
import { useQuery } from "@tanstack/react-query";

const getLabels = async (): Promise<Label[]> => {
    const { data } = await githubApi.get<Label[]>("/labels?per_page=100", {
        headers: {
            Authorization: null
        }
    });
    return data;
};

export const useLabels = () => {
    const labelsQuery = useQuery(["labels"], getLabels, {
        staleTime: 1000 * 60 * 60,
        placeholderData: [
            {
                id: 791921801,
                node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
                url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
                name: "❤️",
                color: "ffffff",
                default: false,
                description: null,
            },
        ]
    });
    return labelsQuery;
};
