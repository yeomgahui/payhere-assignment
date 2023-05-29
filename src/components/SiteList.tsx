import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StarIcon from '@mui/icons-material/Star';
import ListItemText from '@mui/material/ListItemText';
import { Site } from '../types/Site';
import styled from 'styled-components';

const StyledStarIcon = styled(StarIcon)`
  color: #f7e600;
`;
interface SiteListProps {
  items: Site[];
  onDeleteItem: (id: number) => void;
  onSelectItem: (id: number) => void;
}

const SiteList: React.FC<SiteListProps> = ({ items, onDeleteItem, onSelectItem }) => {
  const handleDeleteClick = (id: number) => {
    onDeleteItem(id);
  };

  const handleItemClick = (id: number) => {
    onSelectItem(id);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(item.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemButton onClick={() => handleItemClick(item.id)}>
            <ListItemAvatar>
              <StyledStarIcon />
            </ListItemAvatar>
            <ListItemText primary={item.url} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default SiteList;
