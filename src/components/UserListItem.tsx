import { useState } from 'react';
import { User } from '../types/GitHubTypes';
import { 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemAvatar, 
    Box, 
    Avatar, 
    Typography 
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepositoryListItem } from './RepositoryListItem';

interface UserListItemProps {
    user: User;
    selectedItem: string | null;
    onItemSelect: (item: string | null) => void;
}

export const UserListItem = ({ user, selectedItem, onItemSelect }: UserListItemProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleItemSelect = () => {
        onItemSelect(user.login);
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <List>
            <ListItem alignItems="flex-start">
                <ListItemButton 
                    selected={selectedItem === user.login}
                    onClick={handleItemSelect}
                    sx={{ 
                        height: '150px', 
                        borderRadius: '5px', 
                        display: 'grid', 
                        gridTemplateColumns: 'auto 1fr auto' 
                    }}
                >
                    <ListItemAvatar sx={{ width: '80px', height: '80px' }}>
                        <Avatar src={user.avatarUrl} alt={`${user.login}'s avatar`} sx={{ width: '100%', height: '100%' }} />
                    </ListItemAvatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">{user.name || user.login}</Typography>
                        <Typography component="span" variant="body2" color="text.primary">
                            {user.bio || 'No bio available'}
                        </Typography>
                        <Box>
                            <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                                Followers: {user.followers.totalCount}
                            </Typography>
                            <Typography variant="body1" component="span">
                                Following: {user.following.totalCount}
                            </Typography>
                        </Box>
                    </Box>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
            </ListItem>
            {open && (
                <List component="div" disablePadding sx={{ pl: 4, pr: 2 }}>
                    {user.repositories.nodes.map((repo) => (
                        <RepositoryListItem key={repo.name} repository={repo} />
                    ))}
                </List>
            )}
        </List>
    );
};