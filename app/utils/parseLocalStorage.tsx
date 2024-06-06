export function parseLocalStorage(storage: Storage, storageItem: string) {
    let stringified: string = storage.getItem(storageItem) || ''
    let parsed = JSON.parse(stringified)
    return parsed
  }