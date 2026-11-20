import { registerApplicationMenu } from './application'

/**
 * Register all menus (application menu, tray menu, and later context menus).
 * Call once after `app.whenReady()`.
 */
export function registerMenus() {
  registerApplicationMenu()
}
