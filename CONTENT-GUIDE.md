# Editing the Team Yulsa website

This guide is for the Team Yulsa team. You can update the people shown on the website without a
developer, and without touching code.

## Add or remove a team member

1. Go to **https://app.pagescms.org** and sign in with GitHub.
   (Once the new site is live, **https://teamyulsa.com/admin** also forwards there.)
2. Choose the repository **team-yulsa-redesign**.
3. Open **Team members**.
4. To add someone: click **Add item**, then fill in:
   - **Full name** — shown under the photo.
   - **Role / title** — for example, “Senior Associate”.
   - **Short note** — the one-line description shown on the About page.
   - **Photo** — upload a portrait. A vertical photo (3:4) works best. The site resizes and
     compresses it automatically.
   - **Display order** — lower numbers appear first. Use 1 for the founder, then 2, 3, 4…
   - **Show on the website** — leave on. Turn it off to hide someone without deleting them.
5. To remove someone: open their row and delete it.
6. Click **Save** / **Publish**. Your change is committed to GitHub and the site rebuilds
   automatically (usually within 1–2 minutes).

## Photo tips

- Use a recent, well-lit portrait with the face near the top of the frame.
- Avoid group photos or screenshots.
- Upload JPG, PNG, or WebP. Phone photos are fine; the build optimizes them.
- Name files simply (for example, `jane-cooper.jpg`). Pages CMS cleans up file names for you.

## What updates automatically

- The home-page face strip (first six team members by display order).
- The About page team grid (all published members).
- Photo sizes and WebP versions for fast loading.

## If a change does not appear

1. Wait 2 minutes and refresh.
2. Open the repository’s **Actions** tab on GitHub and check the latest build finished.
3. If the build failed, open the log and send it to your developer. Most failures are caused by a
   photo with an unusual file type — re-upload it as JPG and publish again.

## Other content

Names, roles, and photos are the only content edited through Pages CMS today. Service descriptions,
pricing language, and page copy live in the code (`client/src/lib/siteData.ts` and the page files)
and should be changed by a developer.
