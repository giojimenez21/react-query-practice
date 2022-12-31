import axios from "axios";

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },
});



