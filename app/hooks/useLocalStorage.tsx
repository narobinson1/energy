import { useSyncExternalStore } from "react";

export function useLocalStorage() {
    const storage = useSyncExternalStore(subscribe, getSnapshot)
    return storage
}

function getSnapshot() {
    return localStorage
}
  
function subscribe(callback: { (this: Window, ev: StorageEvent): any; (this: Window, ev: StorageEvent): any; }) {
    window.addEventListener('storage', callback)
    return () => {
      window.removeEventListener('storage', callback)
    }
}