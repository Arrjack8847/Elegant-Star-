# Elegant Star Static Collection Data

The website is static and uses local files only. The active collection source is:

```txt
public/media/collections/
```

Public media URLs must use:

```txt
/media/collections/...
```

## Active Data Flow

- `elegantStarCollections.fromPosts.ts` is generated from the five active collection folders.
- `collections.ts` adapts that generated data to the UI shape used by collection cards and detail pages.
- `designs.ts` re-exports from `collections.ts` for the existing design routes.
- `home.ts` builds homepage previews from the same adapted collection data.
- `stories.ts` keeps five curated story entries and uses existing story media from `siteMedia.ts`.

## Categories

1. Special One
2. Wedding Invitations
3. Certificate Folders
4. Gifts & Favours
5. Corporate & Official

No tag filtering is used. Every collection item has one category.

## Privacy Note

Generated visible text is based on folder names and cleaned product descriptions. It does not include couple names, customer names, phone numbers, addresses, hashtags or raw captions.

Original media may still visually contain printed names or event details. Review images manually before publishing.
