self.addEventListener("push", (event) => {
  let payload = {
    title: "GoharOnline Update",
    body: "A new post is available.",
    url: "/blog",
    tag: "goharonline-notice",
  };

  try {
    const data = event.data?.json();
    if (data) {
      payload = {
        ...payload,
        ...data,
      };
    }
  } catch {
    // ignore invalid payload
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: payload.tag,
      data: { url: payload.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || "/blog";
  event.waitUntil(clients.openWindow(target));
});