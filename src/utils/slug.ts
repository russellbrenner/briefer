// Convert a content id like
//   "LAW20009/Week 7/Week 7 - Study Guide"
// into a URL path like
//   "law20009/week-7/week-7-study-guide"
export function slugifyPath(id: string): string {
  return id
    .split('/')
    .map((seg) =>
      seg
        .toLowerCase()
        // replace non-alphanumeric with dashes
        .replace(/[^a-z0-9]+/g, '-')
        // collapse multiple dashes
        .replace(/-+/g, '-')
        // trim leading/trailing dashes
        .replace(/^-|-$/g, '')
    )
    .join('/');
}

