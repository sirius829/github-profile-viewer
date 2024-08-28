export interface Repository {
    name: string;
    description?: string;
    url: string;
}

export interface User {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    followers: {
        totalCount: number;
    };
    following: {
        totalCount: number;
    };
    repositories: {
        nodes: Repository[];
    };
    __typename: string;
}

export interface Edge {
    node: User;
}

export interface StatusMessageProps {
    imageSrc: string;
    message: string;
}