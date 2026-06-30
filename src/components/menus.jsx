import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

export default function GenericMenu({ anchorEl, open, onClose, items, onItemClick }) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {items.map((item) => {
        const IconComponent = item.icon;

        return (
          <MenuItem
            key={item.text}
            onClick={() => {
              onItemClick(item);
              onClose();
            }}
          >
            <ListItemIcon>
              <IconComponent fontSize="small" />
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );
};