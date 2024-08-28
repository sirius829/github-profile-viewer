import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusMessage } from './StatusMessage';
import { StatusMessageProps } from '../types/GitHubTypes';

describe('StatusMessage Component', () => {
    test('renders the message and image correctly', () => {
        const props: StatusMessageProps = {
            imageSrc: 'https://via.placeholder.com/150',
            message: 'No results found',
        };

        render(<StatusMessage {...props} />);

        // Check if the image is rendered with the correct source
        const image = screen.getByRole('img', { name: /no results found/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', props.imageSrc);

        // Check if the message is rendered
        expect(screen.getByText(props.message)).toBeInTheDocument();
    });

    test('renders a different message and image', () => {
        const props: StatusMessageProps = {
            imageSrc: 'https://via.placeholder.com/300',
            message: 'Something went wrong',
        };

        render(<StatusMessage {...props} />);

        // Check if the image is rendered with the correct source
        const image = screen.getByRole('img', { name: /no results found/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', props.imageSrc);

        // Check if the message is rendered
        expect(screen.getByText(props.message)).toBeInTheDocument();
    });
});
