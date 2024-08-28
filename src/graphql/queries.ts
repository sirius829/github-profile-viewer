import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
    query SearchUsers($username: String!) {
        search(query: $username, type: USER, first: 5) {
            edges {
                node {
                    ... on User {
                    login
                    name
                    avatarUrl
                    bio
                    followers {
                        totalCount
                    }
                    following {
                        totalCount
                    }
                    repositories(first: 5) {
                        nodes {
                            name
                            description
                            url
                            }
                        }
                    }
                }
            }
        }
    }
`;