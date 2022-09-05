import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

import navItems from '../data/nav';
import useWindowSize from '../hooks/useWindowSize';
import logo from '../public/logo-full.svg';
import Link from './Link';

const drawerWidth = 240;

function Logo() {
  return (
    <Button
      href='https://www.dlford.io'
      component={Link}
      width={119}
      height={44}
    >
      <Image
        src={logo}
        layout='fill'
      />
    </Button>
  );
}

export default function Layout({
  title = 'Developer Utilities',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { width } = useWindowSize();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <List>
        {navItems.map(({ title: itemTitle, href, Icon }) => (
          <ListItem
            key={href}
            disablePadding
          >
            <ListItemButton
              href={href}
              component={Link}
            >
              <ListItemIcon>{!!Icon && <Icon />}</ListItemIcon>
              <ListItemText primary={itemTitle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box>
      <Head>
        <title>{title} | utils.dlford.io</title>
        <meta
          name='description'
          content='Developer utilities by DL Ford'
        />
      </Head>

      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
            }}
          >
            <Logo />
          </Typography>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='Tools'
      >
        <Drawer
          variant={(width || 0) < 600 ? 'temporary' : 'permanent'}
          anchor='right'
          open={(width || 0) < 600 ? mobileOpen : true}
          onClose={(width || 0) < 600 ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={
            (width || 0) < 600
              ? {}
              : {
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                }
          }
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}