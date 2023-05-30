import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import WebIcon from '@mui/icons-material/Web';
import { SiteDetailItem } from '../types';
import styled from 'styled-components';

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface SiteDetailListProps {
  items: SiteDetailItem[];
  onSelectItem: (url: string) => void;
}

const SiteDetailList: React.FC<SiteDetailListProps> = ({ items, onSelectItem }) => {
  const handleItemClick = (url: string) => {
    onSelectItem(url);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.timestamp}>
          <ListItemButton onClick={() => handleItemClick(item.url)}>
            <ListItemAvatar>
              <Avatar>
                <WebIcon />
              </Avatar>
            </ListItemAvatar>
            <StyledListItemText
              primary={item.url}
              secondary={item.formattedDate}
              primaryTypographyProps={{
                component: 'div',
                title: item.url,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default SiteDetailList;
