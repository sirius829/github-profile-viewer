import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserListItem } from './UserListItem';
import { User } from '../types/GitHubTypes';

// Mock data
const mockUser: User = {
    login: 'testuser',
    avatarUrl: 'https://via.placeholder.com/150',
    name: 'Test User',
    bio: 'Test bio',
    followers: { totalCount: 100 },
    following: { totalCount: 50 },
    repositories: {
        nodes: [
            { name: 'repo1', description: 'Description for repo1', url: 'https://github.com/repo1' },
            { name: 'repo2', description: 'Description for repo2', url: 'https://github.com/repo2' },
        ],
    },
    __typename: 'User'
};

describe('UserListItem Component', () => {
    test('renders user information correctly', () => {
        render(
            <UserListItem
                user={mockUser}
                selectedItem={null}
                onItemSelect={() => {}}
            />
        );

        // Check if user name, bio, followers, and following are displayed
        expect(screen.getByText(/test user/i)).toBeInTheDocument();
        expect(screen.getByText(/test bio/i)).toBeInTheDocument();
        expect(screen.getByText(/followers: 100/i)).toBeInTheDocument();
        expect(screen.getByText(/following: 50/i)).toBeInTheDocument();
        expect(screen.getByAltText(/testuser's avatar/i)).toBeInTheDocument();
    });

    test('handles selection correctly', () => {
        const handleSelect = jest.fn();

        render(
            <UserListItem
                user={mockUser}
                selectedItem="testuser"
                onItemSelect={handleSelect}
            />
        );

        // Simulate clicking the user list item
        const listItemButton = screen.getByRole('button');
        fireEvent.click(listItemButton);

        // Verify the click handler is called with the correct argument
        expect(handleSelect).toHaveBeenCalledWith('testuser');
    });

    test('toggles repository list on click', () => {
        render(
            <UserListItem
                user={mockUser}
                selectedItem={null}
                onItemSelect={() => {}}
            />
        );

        const listItemButton = screen.getByRole('button');
        fireEvent.click(listItemButton);

        // Check if the repository items are displayed after clicking
        expect(screen.getByText(/description for repo1/i)).toBeInTheDocument();
        expect(screen.getByText(/description for repo2/i)).toBeInTheDocument();

        // Click again to collapse
        fireEvent.click(listItemButton);

        // Verify the repository items are not displayed anymore
        expect(screen.queryByText(/description for repo1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/description for repo2/i)).not.toBeInTheDocument();
    });
});
