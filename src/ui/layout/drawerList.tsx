import * as React from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const pages = [
  { name: 'Books', href: '/books', icon: InboxIcon },
  {
    name: 'ASd',
    href: '/asd',
    icon: InboxIcon
  }
]

export default function Drawer({ open }: { open: boolean }) {
  const pathname = usePathname()
  console.log('pathname ', pathname)
  return (
    <List>
      {pages.map((page) => {
        const Icon = page.icon

        return (
          <Link
            key={page.name}
            href={page.href}
            style={{ textDecoration: 'none' }}
          >
            <ListItem
              key={'id'}
              disablePadding
              sx={{
                backgroundColor: pathname === page.href ? 'darkgrey' : 'inherit'
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={page.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )
      })}
    </List>
  )
}
