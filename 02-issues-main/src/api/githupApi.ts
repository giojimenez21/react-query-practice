import axios from "axios";

const token = import.meta.env.VITE_GITHUB_API;

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: `Bearer ${token}`
    },
});



