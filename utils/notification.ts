// utils/notification.ts
export function playMessageSound() {
  const audio = new Audio("/sounds/message.mp3");
  audio.play().catch(() => {});
}

export function notifyMessage(title: string, body: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}
