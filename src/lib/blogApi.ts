export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featureImage: string | null;
  notesPdfUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  seoImage: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedPosts = {
  items: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type StudentArticle = {
  id: number;
  studentName: string;
  title: string;
  article: string;
  imageUrl: string | null;
  notesPdfUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  seoImage: string | null;
  status: "pending" | "approved" | "rejected";
  publishedPostId: number | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedStudentArticles = {
  items: StudentArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TutorApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';

export type TutorApplication = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  teachingMode: string;
  subjects: string;
  experience: string;
  availability: string;
  coverMessage: string;
  resumeUrl: string | null;
  status: TutorApplicationStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedTutorApplications = {
  items: TutorApplication[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  q: string;
};

export type EmailSubscriber = {
  id: number;
  email: string;
  isActive: boolean;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedEmailSubscribers = {
  items: EmailSubscriber[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PostComment = {
  id: number;
  postId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedPostComments = {
  items: PostComment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') ?? 'http://localhost:5000';

export function getBlogApiBase() {
  return API_BASE;
}

export async function fetchPosts(
  page = 1,
  limit = 9,
  q = '',
  cache: RequestCache = 'no-store',
): Promise<PaginatedPosts> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (q.trim()) query.set('q', q.trim());

  const response = await fetch(`${API_BASE}/posts?${query.toString()}`, {
    method: 'GET',
    cache,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch posts');
  }

  const data = (await response.json()) as
    | PaginatedPosts
    | BlogPost[];

  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      page: 1,
      limit,
      totalPages: 1,
    };
  }

  return data;
}

export async function fetchPostBySlug(slug: string, cache: RequestCache = 'no-store'): Promise<BlogPost> {
  const response = await fetch(`${API_BASE}/posts/slug/${encodeURIComponent(slug)}`, {
    method: 'GET',
    cache,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch post');
  }

  return (await response.json()) as BlogPost;
}

export async function fetchAdminPosts(token: string, limit = 100): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE}/posts/admin/all?limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch admin posts');
  }

  return (await response.json()) as BlogPost[];
}

export async function fetchAdminPostById(token: string, id: number): Promise<BlogPost> {
  const response = await fetch(`${API_BASE}/posts/admin/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch post');
  }

  return (await response.json()) as BlogPost;
}

export async function uploadAdminPostImage(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/posts/admin/upload-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error('No image URL returned from server');
  }

  return data.url;
}

export async function uploadStudentArticleImage(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/student-articles/upload-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error('No image URL returned from server');
  }

  return data.url;
}

export async function submitStudentArticle(payload: {
  token: string;
  studentName: string;
  title: string;
  article: string;
  imageUrl?: string;
  notesPdfUrl?: string;
}) {
  const { token, ...bodyPayload } = payload;
  const response = await fetch(`${API_BASE}/student-articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(data.message ?? 'Article submission failed');
  }

  return response.json() as Promise<{ message: string }>;
}

export async function fetchStudentArticles(page = 1, limit = 9, q = ''): Promise<PaginatedStudentArticles> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (q.trim()) query.set('q', q.trim());

  const response = await fetch(`${API_BASE}/student-articles?${query.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch student articles');
  }

  return (await response.json()) as PaginatedStudentArticles;
}

export async function fetchAdminStudentArticles(
  token: string,
  options: { status?: string; page?: number; limit?: number; q?: string } = {},
): Promise<PaginatedStudentArticles> {
  const query = new URLSearchParams();
  if (options.status) query.set('status', options.status);
  if (options.page) query.set('page', String(options.page));
  if (options.limit) query.set('limit', String(options.limit));
  if (options.q?.trim()) query.set('q', options.q.trim());

  const response = await fetch(`${API_BASE}/student-articles/admin/all?${query.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch student articles');
  }

  return (await response.json()) as PaginatedStudentArticles;
}

export async function approveStudentArticle(
  token: string,
  id: number,
  payload?: {
    seoTitle?: string;
    seoDescription?: string;
    canonicalUrl?: string;
    seoImage?: string;
  },
) {
  const response = await fetch(`${API_BASE}/student-articles/admin/${id}/approve`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload ?? {}),
  });

  if (!response.ok) {
    throw new Error('Unable to approve article');
  }

  return response.json();
}

export async function rejectStudentArticle(token: string, id: number) {
  const response = await fetch(`${API_BASE}/student-articles/admin/${id}/reject`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Unable to reject article');
  }

  return response.json();
}

export async function uploadTutorResume(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/tutor-applications/upload-resume`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Resume upload failed');
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error('No resume URL returned from server');
  }

  return data.url;
}

export async function submitTutorApplication(payload: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  teachingMode: string;
  subjects: string;
  experience: string;
  availability: string;
  coverMessage: string;
  resumeUrl?: string;
}) {
  const response = await fetch(`${API_BASE}/tutor-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(data.message ?? 'Tutor application failed');
  }

  return response.json() as Promise<{ id: number; message: string; status: TutorApplicationStatus }>;
}

export async function fetchAdminTutorApplications(
  token: string,
  options: { status?: string; page?: number; limit?: number; q?: string } = {},
): Promise<PaginatedTutorApplications> {
  const query = new URLSearchParams();
  if (options.status) query.set('status', options.status);
  if (options.page) query.set('page', String(options.page));
  if (options.limit) query.set('limit', String(options.limit));
  if (options.q?.trim()) query.set('q', options.q.trim());

  const response = await fetch(`${API_BASE}/tutor-applications/admin/all?${query.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch tutor applications');
  }

  return (await response.json()) as PaginatedTutorApplications;
}

export async function updateTutorApplicationStatus(
  token: string,
  id: number,
  payload: { status: TutorApplicationStatus; adminNotes?: string },
) {
  const response = await fetch(`${API_BASE}/tutor-applications/admin/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to update tutor application');
  }

  return response.json() as Promise<TutorApplication>;
}

export async function subscribeEmail(payload: { email: string; source?: string }) {
  const response = await fetch(`${API_BASE}/subscribers/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(data.message ?? 'Subscriber signup failed');
  }

  return response.json();
}

export async function getPushPublicKey() {
  const response = await fetch(`${API_BASE}/subscribers/push-public-key`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch push public key');
  }

  return response.json() as Promise<{ publicKey: string }>;
}

export async function savePushSubscription(payload: {
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };
  email?: string;
  enabled?: boolean;
}) {
  const response = await fetch(`${API_BASE}/subscribers/push`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(data.message ?? 'Push subscription failed');
  }

  return response.json();
}

export async function unsubscribePush(endpoint: string) {
  const response = await fetch(`${API_BASE}/subscribers/push/unsubscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ endpoint }),
  });

  if (!response.ok) {
    throw new Error('Unable to unsubscribe push notifications');
  }

  return response.json() as Promise<{ success: boolean }>;
}

export async function fetchAdminEmailSubscribers(
  token: string,
  options: { page?: number; limit?: number; q?: string } = {},
) {
  const query = new URLSearchParams();
  if (options.page) query.set('page', String(options.page));
  if (options.limit) query.set('limit', String(options.limit));
  if (options.q?.trim()) query.set('q', options.q.trim());

  const response = await fetch(`${API_BASE}/subscribers/admin/email?${query.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch subscribers');
  }

  return response.json() as Promise<PaginatedEmailSubscribers>;
}

export async function updateEmailSubscriberStatus(
  token: string,
  id: number,
  isActive: boolean,
) {
  const response = await fetch(`${API_BASE}/subscribers/admin/email/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    throw new Error('Unable to update subscriber');
  }

  return response.json();
}

export async function fetchPostComments(slug: string, page = 1, limit = 20) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_BASE}/comments/post/${encodeURIComponent(slug)}?${query.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch comments');
  }

  return response.json() as Promise<PaginatedPostComments>;
}

export async function createPostComment(token: string, slug: string, content: string) {
  const response = await fetch(`${API_BASE}/comments/post/${encodeURIComponent(slug)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(data.message ?? 'Unable to post comment');
  }

  return response.json() as Promise<PostComment>;
}
