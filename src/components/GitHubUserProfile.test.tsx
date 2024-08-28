import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_PROFILE } from '../graphql/queries';
import { GitHubUserProfile } from './GitHubUserProfile';

// Mock data
const mockData = {
    search: {
        edges: [
            {
                node: {
                    __typename: "User",
                    login: "testuser",
                    name: "Test User",
                    avatarUrl: "https://via.placeholder.com/150",
                    bio: "Test bio",
                    followers: { totalCount: 100 },
                    following: { totalCount: 50 },
                    repositories: {
                        nodes: [
                            { name: 'repo1', description: 'Repo 1 description', url: 'https://github.com/repo1' }
                        ],
                    },
                },
            },
        ],
    },
};

const mocks = [
    {
        request: {
            query: GET_USER_PROFILE,
            variables: { username: "testuser in:login" },
        },
        result: {
            data: mockData,
        },
    },
];

// Suppress console.error output
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('GitHubUserProfile Component', () => {
    test('renders initial state with welcome message', () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <GitHubUserProfile />
            </MockedProvider>
        );

        expect(screen.getByText(/GitHub Profile Viewer/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter GitHub username/i)).toBeInTheDocument();
    });

    test('updates input field value', () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <GitHubUserProfile />
            </MockedProvider>
        );

        const input = screen.getByPlaceholderText(/Enter GitHub username/i);
        fireEvent.change(input, { target: { value: 'testuser' } });

        expect(input).toHaveValue('testuser');
    });

    test('triggers search and shows loading state', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <GitHubUserProfile />
            </MockedProvider>
        );

        const input = screen.getByPlaceholderText(/Enter GitHub username/i);
        fireEvent.change(input, { target: { value: 'testuser' } });
        fireEvent.click(screen.getByLabelText(/search/i));

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    });

    test('displays error message on network error', async () => {
        const errorMock = [
            {
                request: {
                    query: GET_USER_PROFILE,
                    variables: { username: "testuser in:login" },
                },
                error: new Error("Network error"),
            },
        ];

        render(
            <MockedProvider mocks={errorMock} addTypename={false}>
                <GitHubUserProfile />
            </MockedProvider>
        );

        const input = screen.getByPlaceholderText(/Enter GitHub username/i);
        fireEvent.change(input, { target: { value: 'testuser' } });
        fireEvent.click(screen.getByLabelText(/search/i));

        await waitFor(() => expect(screen.getByText(/Network error/i)).toBeInTheDocument());
    });

    test('displays no results message when search returns empty', async () => {
        const noResultsMock = [
            {
                request: {
                    query: GET_USER_PROFILE,
                    variables: { username: "unknownuser in:login" },
                },
                result: {
                    data: { search: { edges: [] } },
                },
            },
        ];

        render(
            <MockedProvider mocks={noResultsMock} addTypename={false}>
                <GitHubUserProfile />
            </MockedProvider>
        );

        const input = screen.getByPlaceholderText(/Enter GitHub username/i);
        fireEvent.change(input, { target: { value: 'unknownuser' } });
        fireEvent.click(screen.getByLabelText(/search/i));

        await waitFor(() => expect(screen.getByText(/Hmm, no result.../i)).toBeInTheDocument());
    });
});
