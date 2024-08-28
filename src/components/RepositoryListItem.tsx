import { Repository } from '../types/GitHubTypes';
import { ListItemButton, ListItemText } from '@mui/material';

interface RepositoryListItemProps {
    repository: Repository;
}

export const RepositoryListItem = ({ repository }: RepositoryListItemProps) => {
    const handleClick = () => {
        window.open(repository.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <ListItemButton
            onClick={handleClick}
            sx={{ borderRadius: '5px' }}
        >
            <ListItemText
                primary={repository.name}
                secondary={repository.description || 'No description available'}
            />
        </ListItemButton>
    );
};