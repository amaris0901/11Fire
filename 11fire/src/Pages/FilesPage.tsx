import React, { useState } from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Snackbar
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileEntry {
  name: string;
  cid: string;
  size: string;
  date: string;
  isFile: boolean;
}

const mockCid = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let cid = 'bafy';
  for (let i = 0; i < 42; i++) cid += chars[Math.floor(Math.random() * chars.length)];
  return cid;
};

const formatSize = (size: number): string => {
  if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + ' MB';
  if (size >= 1024) return (size / 1024).toFixed(1) + ' KB';
  return size + ' B';
};

const truncateCid = (cid: string): string => cid.slice(0, 6) + '...' + cid.slice(-4);

const FilesPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isFileUpload, setIsFileUpload] = useState(true);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [fileMenuAnchor, setFileMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null);

  // NEW STATE: Detect rename mode
  const [isRenameMode, setIsRenameMode] = useState(false);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleFileUploadClick = () => {
    setAnchorEl(null);
    setIsFileUpload(true);
    setIsRenameMode(false);
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setFileName(file.name);
        setFileSize(formatSize(file.size));
        setDialogOpen(true);
      }
    };
    input.click();
  };

  const handleFolderUploadClick = () => {
    setAnchorEl(null);
    setIsFileUpload(false);
    setIsRenameMode(false);
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const filesList = target.files;
      if (filesList && filesList.length > 0) {
        const totalSize = Array.from(filesList).reduce((acc, file) => acc + file.size, 0);
        setSelectedFile(null);
        setFileName(filesList[0].webkitRelativePath.split('/')[0]);
        setFileSize(formatSize(totalSize));
        setDialogOpen(true);
      }
    };
    input.click();
  };

  const handleUpload = () => {
    if (isRenameMode && activeFileIndex !== null) {
      const updatedFiles = [...files];
      updatedFiles[activeFileIndex] = {
        ...updatedFiles[activeFileIndex],
        name: fileName
      };
      setFiles(updatedFiles);
    } else {
      const newFile: FileEntry = {
        name: fileName,
        cid: mockCid(),
        size: fileSize,
        date: new Date().toLocaleDateString(),
        isFile: isFileUpload
      };
      setFiles([...files, newFile]);
    }

    setDialogOpen(false);
    setIsRenameMode(false);
    setActiveFileIndex(null);
  };

  const handleCopyCid = (cid: string) => {
    navigator.clipboard.writeText(cid);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: 200,
          bgcolor: '#EF4444',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4,
          color: 'white'
        }}
      >
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.300', mb: 1 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          11Fire
        </Typography>
        <List>
          <ListItemButton selected sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary="Files" />
          </ListItemButton>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, bgcolor: '#FFF7ED', p: 4 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          FILES
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#f1e9dd',
              borderRadius: 2,
              width: 400,
              height: 32,
              px: 2
            }}
          >
            <SearchIcon sx={{ color: '#5f5a54', mr: 1 }} />
            <TextField
              placeholder="Search"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: '0.9rem', color: '#6B7280' }
              }}
              fullWidth
            />
          </Paper>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{ bgcolor: 'color.primary', borderRadius: 2 }}
          >
            Add
          </Button>
        </Box>

        {files.length === 0 ? (
          <Box
            sx={{
              bgcolor: '#fff7ed',
              border: '1px solid #d6cfc1',
              borderRadius: 3,
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography sx={{ color: '#3c3c3c', fontWeight: 300 }}>
              No files here yet. Add files by clicking the <strong>Add</strong> button.
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, bgcolor: '#fefaf4' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f3ede1' }}>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>CID</strong></TableCell>
                  <TableCell><strong>Size</strong></TableCell>
                  <TableCell><strong>Creation Date</strong></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file, idx) => (
                  <TableRow key={idx} hover sx={{ bgcolor: '#fffaf3' }}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {file.isFile ? (
                          <InsertDriveFileIcon sx={{ color: '#e17d5f', mr: 1 }} />
                        ) : (
                          <FolderIcon sx={{ color: '#e17d5f', mr: 1 }} />
                        )}
                        {file.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {truncateCid(file.cid)}
                        <IconButton size="small" sx={{ ml: 1 }} onClick={() => handleCopyCid(file.cid)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.date}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => {
                          setFileMenuAnchor(e.currentTarget);
                          setActiveFileIndex(idx);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              bgcolor: '#fff7ed',
              boxShadow: 3,
              borderRadius: 3,
              px: 1,
              py: 0.5
            }
          }}
        >
          <MenuItem onClick={handleFileUploadClick} sx={{ borderRadius: '12px', '&:hover': { bgcolor: '#f3ede1' } }}>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" sx={{ color: '#e17d5f' }} />
            </ListItemIcon>
            <ListItemText primary="Upload File" />
          </MenuItem>
          <MenuItem onClick={handleFolderUploadClick} sx={{ borderRadius: '12px', '&:hover': { bgcolor: '#f3ede1' } }}>
            <ListItemIcon>
              <FolderIcon fontSize="small" sx={{ color: '#e17d5f' }} />
            </ListItemIcon>
            <ListItemText primary="Upload Folder" />
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={fileMenuAnchor}
          open={Boolean(fileMenuAnchor)}
          onClose={() => {
            setFileMenuAnchor(null);
            setActiveFileIndex(null);
          }}
          PaperProps={{
            sx: {
              bgcolor: '#fff7ed',
              boxShadow: 3,
              borderRadius: 3,
              px: 1,
              py: 0.5
            }
          }}
        >
          <MenuItem
            onClick={() => {
              if (activeFileIndex !== null) {
                setIsRenameMode(true);
                setFileName(files[activeFileIndex].name);
                setDialogOpen(true);
              }
              setFileMenuAnchor(null);
            }}
            sx={{ borderRadius: '12px', '&:hover': { bgcolor: '#f3ede1' } }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" sx={{ color: '#e17d5f' }} />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (activeFileIndex !== null) {
                alert(`Download ${files[activeFileIndex].name}`);
              }
              setFileMenuAnchor(null);
            }}
            sx={{ borderRadius: '12px', '&:hover': { bgcolor: '#f3ede1' } }}
          >
            <ListItemIcon>
              <FileDownloadIcon fontSize="small" sx={{ color: '#e17d5f' }} />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (activeFileIndex !== null) {
                const updatedFiles = [...files];
                updatedFiles.splice(activeFileIndex, 1);
                setFiles(updatedFiles);
              }
              setFileMenuAnchor(null);
            }}
            sx={{ borderRadius: '12px', '&:hover': { bgcolor: '#f3ede1' } }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" sx={{ color: '#e17d5f' }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>

        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setIsRenameMode(false);
          }}
          PaperProps={{
            sx: {
              borderRadius: 3,
              px: 4,
              pt: 3,
              pb: 2,
              bgcolor: '#fff7ed',
              minWidth: 400
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.4rem', mb: 1 }}>
            {isRenameMode ? 'Rename' : isFileUpload ? 'File Upload' : 'Folder Upload'}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1, fontSize: '1rem' }}>
              Confirm file name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              sx={{ bgcolor: '#fff7ed', borderRadius: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setDialogOpen(false);
                setIsRenameMode(false);
              }}
              sx={{ borderRadius: 2, color: '#3c3c3c', borderColor: '#ccc' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{
                borderRadius: 2,
                bgcolor: 'color.primary',
                color: '#000',
                '&:hover': { bgcolor: '#f8a07a' }
              }}
            >
              {isRenameMode ? 'Rename' : 'Upload'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Copied to Clipboard"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default FilesPage;
