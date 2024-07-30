export const checkSlugUnique = async (slug: string) => {
    const response = await fetch(`/api/check-slug?slug=${encodeURIComponent(slug)}`);
    const data = await response.json();
    if (response.ok) {
        return !data.exists;
    } else {
        throw new Error(data.error || 'Error checking slug');
    }
};
