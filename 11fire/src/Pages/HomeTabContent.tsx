import React, { useState } from "react";
import { Box, Typography, Paper, Avatar, ListItemIcon, MenuItem, ListItemText, Menu } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";

interface Group {
  name: string;
  members: number;
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: "12px",
  border: `1px solid ${theme.palette.custom.border}`,
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.15)",
  color: theme.palette.text.primary,
  textAlign: "left",
}));

const HomeTabContent = () => {
  const [groups, setGroups] = useState<Group[]>([
    { name: "Nayche’s group", members: 10 },
    { name: "Nanzun’s group", members: 25 },
  ]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCreateNew = () => {
    const groupName = prompt("Enter group name:");
    if (groupName) {
      const memberCount = parseInt(prompt("Enter number of members:") || "0", 10);
      setGroups((prev) => [...prev, { name: groupName, members: memberCount }]);
    }
    handleMenuClose();
  };

  const handleJoinGroup = () => {
    const groupName = prompt("Enter group to join:");
    if (groupName) {
      const memberCount = parseInt(prompt("Enter number of members:") || "0", 10);
      setGroups((prev) => [...prev, { name: groupName, members: memberCount }]);
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.primary", p: 1 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          HOME
        </Typography>
        <Avatar
          sx={{ bgcolor: "#EF4444", width: 36, height: 36, fontSize: "1rem" }}
        >
          N
        </Avatar>
      </Box>

      {/* Group Cards Grid */}
      <Grid container spacing={4}>
        {groups.map((group, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
            <Item>
              <Typography fontWeight={600} fontSize="1.1rem" mb={1}>
                {group.name}
              </Typography>
              <Typography fontSize="0.95rem">
                Members : {group.members}
              </Typography>
            </Item>
          </Grid>
        ))}

        {/* Join/Create */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item
            onClick={handleMenuClick}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#5f5a54",
              bgcolor: "#f7f0e7",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <AddIcon />
              <Typography fontSize="0.95rem">Join or Create</Typography>
            </Box>
            <Typography fontSize="0.95rem">group</Typography>
          </Item>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: "#fff5e9",
                borderRadius: 3,
                px: 2,
                py: 1.5,
                minWidth: 200,
                boxShadow: 3,
              },
            }}
          >
            <MenuItem onClick={handleCreateNew} sx={{ color: "#ef4444" }}>
              <ListItemIcon>
                <AddIcon fontSize="small" sx={{ color: "#ef4444" }} />
              </ListItemIcon>
              <ListItemText primary="Create new" />
            </MenuItem>
            <MenuItem onClick={handleJoinGroup} sx={{ color: "#ef4444" }}>
              <ListItemIcon>
                <AddIcon fontSize="small" sx={{ color: "#ef4444" }} />
              </ListItemIcon>
              <ListItemText primary="Join group" />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeTabContent;