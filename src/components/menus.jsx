import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

export default function GenericMenu({ anchorEl, open, onClose, items, onItemClick }) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {items.map((item, index) => (
        <MenuItem
          key={item.id || index}
          onClick={() => {
            onItemClick(item);
            onClose();
          }}
        >
          {item.icon && (
            <ListItemIcon>
              <item.icon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText>{item.text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}