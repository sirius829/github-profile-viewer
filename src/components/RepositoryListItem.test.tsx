import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepositoryListItem } from './RepositoryListItem';
import { Repository } from '../types/GitHubTypes';

const mockRepository: Repository = {
    name: 'mock-repo',
    description: 'This is a mock repository',
    url: 'https://github.com/mock-repo'
};

describe('RepositoryListItem Component', () => {
    test('renders repository name and description correctly', () => {
        render(<RepositoryListItem repository={mockRepository} />);

        // Check if the repository name and description are displayed
        expect(screen.getByText(/mock-repo/i)).toBeInTheDocument();
        expect(screen.getByText(/this is a mock repository/i)).toBeInTheDocument();
    });

    test('renders default message when description is not provided', () => {
        const noDescriptionRepository = {
            ...mockRepository,
            description: undefined
        };

        render(<RepositoryListItem repository={noDescriptionRepository} />);

        // Check if the default message for no description is displayed
        expect(screen.getByText(/no description available/i)).toBeInTheDocument();
    });

    test('opens repository URL in a new tab on click', () => {
        // Mock window.open
        const windowOpenMock = jest.spyOn(window, 'open').mockImplementation(() => null);

        render(<RepositoryListItem repository={mockRepository} />);

        // Simulate clicking the list item button
        const listItemButton = screen.getByRole('button');
        fireEvent.click(listItemButton);

        // Check if window.open was called with the correct arguments
        expect(windowOpenMock).toHaveBeenCalledWith('https://github.com/mock-repo', '_blank', 'noopener,noreferrer');

        // Restore the original implementation of window.open
        windowOpenMock.mockRestore();
    });
});
