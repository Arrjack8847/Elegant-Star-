# Elegant Star Motion Media Inventory

This inventory was generated from the original motion files and keeps public naming anonymous and editorial. Originals are preserved under `media-source/videos-original/`; website-ready copies live under `public/media/motion/`.

## Summary

- Original video files inspected: 38
- Unique website-ready videos: 36
- Exact duplicate files: 2
- Videos needing H.264 conversion: 21

## Category Counts

- brand: 1
- collections: 16
- details-and-finishes: 8
- packaging-and-presentation: 8
- accessories: 2
- process-and-making: 1
- stories: 0

## Duplicate Handling

Exact duplicates were identified by SHA-256 hash. Only one website-ready copy was created for each exact duplicate group. All original files, including duplicate copies, remain preserved in `media-source/videos-original/`.

## Visually Similar Review Notes

- `neutral-gold-ornate-folder-detail-01.mp4` and `neutral-gold-ornate-folder-detail-02.mp4` show very similar neutral gold folder material, but they have different hashes, durations/codecs, and frame sequences. Both were kept for review.
- Several ornate relief detail clips show related sculpted-folder finishes in different colors or setups. They were grouped with `ornate-relief-folder-details` in the inventory and kept as non-identical assets.
- Accessory assortment clips overlap in subject matter but show different product sequences; both unique versions were kept.
- Boxed presentation clips share packaging themes but differ by product, color, or composition; all non-identical versions were kept.

## Files

- `videos.csv`: full original-to-website-ready inventory
- `videos.json`: JSON version of the full inventory
- `duplicates.csv`: exact duplicate group report
- `conversion-needed.csv`: unique videos marked `convert-to-h264` or `review`

## Conversion Guidance

Videos marked `convert-to-h264` use VP9 or AV1 and should be converted before production use. Preferred output: MP4 container, H.264 video, yuv420p pixel format, and AAC audio or muted preview audio. No conversions were performed in this pass.
