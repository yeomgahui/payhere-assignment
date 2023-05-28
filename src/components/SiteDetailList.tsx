import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';

interface SiteDetailItem {
  url: string;
  timestamp: string;
}

interface SiteDetailListProps {
  items: SiteDetailItem[];
  onDeleteItem?: (id: number) => void;
  onSelectItem?: (id: number) => void;
}

const SiteDetailList: React.FC<SiteDetailListProps> = ({ items, onDeleteItem, onSelectItem }) => {
  const handleDeleteClick = (id: number) => {
    // onDeleteItem(id);
  };

  const handleItemClick = (id: number) => {
    // onSelectItem(id);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.timestamp}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.url} secondary={item.timestamp} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default SiteDetailList;
