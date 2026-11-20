import { Menu, MenuItem, MenuItemConstructorOptions, shell } from 'electron'

import { openFile } from '@/main/utils/file'

const fileOpenMenuItem: MenuItemConstructorOptions = {
  label: 'Open...',
  // Open file select dialog
  click: async () => {
    const result = await openFile()
    if (!result) {
      return
    }

    // TODO: Send file content from main to renderer
  },
}

const menuTemplate: MenuItemConstructorOptions[] = [
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://github.com/time1043')
        },
      },
    ],
  },
]

/**
 * Customize the application menu (the top menu bar).
 *
 * https://www.electronjs.org/docs/latest/tutorial/application-menu
 * https://www.electronjs.org/docs/latest/tutorial/menus#default-menu-roles
 */
export function registerApplicationMenu() {
  // const currentAppMenu = Menu.getApplicationMenu();
  const currentMenuItems =
    Menu.getApplicationMenu()?.items.map((item: MenuItem) => {
      if (item.role?.toLowerCase() === 'filemenu') {
        return new MenuItem({
          role: 'fileMenu',
          // submenu: [...item.submenu?.items],
          submenu: Menu.buildFromTemplate([fileOpenMenuItem, ...(item.submenu?.items || [])]),
        })
      } else {
        return item
      }
    }) || []
  const menu = Menu.buildFromTemplate([...currentMenuItems, ...menuTemplate])
  Menu.setApplicationMenu(menu)
}
