import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql/queries';
import { 
    InputBase, 
    IconButton, 
    Box, 
    Typography, 
    Paper, 
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserListItem } from './UserListItem';
import { StatusMessage } from './StatusMessage';
import { User, Edge } from '../types/GitHubTypes';
import welcomeImage from '../assets/welcome.png';
import noResultImage from '../assets/no_result.png';
import errorImage from '../assets/error.jpg';
import { ApolloError } from '@apollo/client';

export const GitHubUserProfile = () => {
    const [username, setUsername] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [initLoad, setInitLoad] = useState(true);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const [fetchUsers, { loading, error }] = useLazyQuery(GET_USER_PROFILE, {
        onCompleted: (data) => {
            const filteredUsers = data.search.edges
                .map((edge: Edge) => edge.node)
                .filter((user: User) => user.__typename === "User");
            setSearchResults(filteredUsers);
            setInitLoad(false);
        },
        onError: (error: ApolloError) => handleError(error),
    });

    const handleError = (error: ApolloError) => {
        if (error.networkError) {
            console.error("Network error:", error.networkError);
        } else if (error.graphQLErrors) {
            error.graphQLErrors.forEach(({ message }) => {
                console.error("GraphQL error:", message);
            });
        } else {
            console.error("Error fetching users:", error.message || "An unexpected error occured.");
        }

        setSearchResults([]);
        setInitLoad(false);
    };

    const handleSearch = () => {
        if (!username.trim()) {
            setSearchResults([]);
            setInitLoad(true);
            return;
        }

        fetchUsers({ variables: { username: `${username} in:login` } });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const getStatusMessageProps = () => {
        if (initLoad) {
            return { imageSrc: welcomeImage, message: 'GitHub Profile Viewer' };
        } else if (error) {
            return {
                imageSrc: errorImage,
                message: error.networkError
                    ? 'Network error: Please check your connection.'
                    : error.graphQLErrors.length > 0
                        ? error.graphQLErrors[0].message
                        : 'An unexpected error occured.'
            };
        } else if (searchResults.length === 0) {
            return { imageSrc: noResultImage, message: 'Hmm, no result...' };
        }

        return { imageSrc: '', message: '' };
    };

    const statusMessageProps = getStatusMessageProps();

    return (
        <Paper elevation={0} sx={{ mt: 7 }}>
            <Paper
                component="form"
                color='secondary'
                onSubmit={(e) => e.preventDefault()}
                sx={{
                    p: '2px 2px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '70%',
                    margin: '0 auto',
                    borderRadius: '24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                <InputBase
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    size='small'
                    sx={{
                        flexGrow: 1,
                        ml: 2,
                    }}
                />
                <IconButton 
                    type="button" 
                    onClick={handleSearch} 
                    sx={{ 
                        p: '10px', 
                        '&:focus': { outline: 'none' }
                    }} 
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            {loading ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 'calc(100vh - 250px)' }}
                >
                    <CircularProgress />
                    <Typography variant='body1' sx={{ ml: 2 }}>Loading...</Typography>
                </Box>
            ) : searchResults.length > 0 ? (
                <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', pl: 1, pr: 1, mt: 1 }}>
                    {searchResults.map((user) => (
                        <UserListItem
                            key={user.login} 
                            user={user}
                            selectedItem={selectedItem}
                            onItemSelect={setSelectedItem}
                        />
                    ))}
                </Box>
            ) : (
                <StatusMessage imageSrc={statusMessageProps.imageSrc} message={statusMessageProps.message} />
            )}
        </Paper>
    );
};