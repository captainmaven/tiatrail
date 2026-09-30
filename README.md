# TIA Learning Trail: Vercel export

Exported from the published app, version 37 (September 29, 2026).
Source commit: d441512644bb73319e347c7c316e530838ad49e6.

## Deploy

Requires Node.js 22.13 or later and a Vercel account.

1. Extract this ZIP and open a terminal in the extracted folder.
2. Run `npm ci`.
3. Run `npm run build` to check the production build.
4. Run `npx vercel --prod` and follow the account and project prompts.
   Select Next.js if asked. No environment variables or database are required.

Alternatively, push the extracted project to your own GitHub repository and import
that repository into Vercel. The included vercel.json configures the build.

## Local development

Run `npm run dev`, then open http://localhost:3000.

## Preserved behavior

- Ten learning stops, practice, field cases, resources, achievements and settings.
- Progress saved in this browser's localStorage, without user sign-in.
- Welcome video on each visit, muted autoplay without controls.
- Completion celebration video after all ten stops, muted autoplay without controls.
- Current artwork, responsive layout, stop-and-jot prompts and motion settings.

## Hosting changes

This copy uses standard Next.js instead of the Sites-specific Cloudflare build.
Unused Cloudflare database routes and legacy ChatGPT authentication were removed.
The initial legacy server-history request was removed; device storage remains intact.
No credentials, deployment tokens, database, node_modules or build output are included.
The existing Sites app is unchanged.

## Progress and media

Browser storage is specific to an address. Existing progress at the Sites address
does not automatically transfer to the Vercel address. Returning users retain progress
when visiting the same address and browser unless browser storage is cleared.

The two MP4 videos continue to load from the supplied ImageKit URLs. Those URLs
must remain available. Browser/device autoplay restrictions can prevent playback
in some environments even with muted autoplay configured.
