# Team Yulsa Redesign — Fix Round

## 1. Photo/name alignment
- [ ] Re-fetch teamyulsa.com About page HTML and extract photo URLs + names + roles in document order
- [ ] Compare with current TEAM array photo assignments in siteData/About.tsx
- [ ] Fix mismatches: correct photo for each name; update About page roster table + hero trust strip + photo band
- [ ] Verify each photo actually matches the person visually (view images)

## 2. Interior pages redesign (Services, Industries, Security, About)
- [ ] About page: fix contrast (dark navy band text vs background), declutter team section, better spacing
- [ ] Services page: cleaner layout, better contrast, less cramped
- [ ] Industries hub: consistent card design, better contrast
- [ ] Security page: better visual hierarchy and contrast
- [ ] Check mobile for all

## 3. Remove price range mentions
- [ ] Remove "$300" / "$1,200" / price range mentions in FAQ, stats, pages
- [ ] Replace with "fixed monthly pricing" language
- [ ] Verify grep for $ amounts returns none (except currency examples if any)

## 4. Verify & deliver
- [ ] TypeScript clean
- [ ] Screenshots of all pages
- [ ] Checkpoint + deliver

## STATE (saved before compaction)

### Verified photo mapping (from teamyulsa.com about page, in document order)
| Photo file (in /home/ubuntu/webdev-static-assets/yulsa-team/) | Person |
|---|---|
| 1779820542_Photo.png | CA Sagun Jung Rana (arms crossed) → uploaded /manus-storage/sagun_ca_0b9ac2f3.png |
| 1779820474_Prabesh Pic.png | Prabesh Bhusal → /manus-storage/prabesh_57af839c.png |
| 1779820449_Nisha Pic.png | Nisha Khanal → /manus-storage/nisha_94569046.png |
| 1779820567_..._qbl22l.png | Aayush Shah → /manus-storage/aayush2_20008bc2.png |
| 1779820312_Himal Pic.png | Himal Ayman Karki → /manus-storage/himal_485516ec.png |
| 1779466641_..._9hwlmw.png | Dinesh Puri → /manus-storage/dinesh_89398095.png |
| 1779466616_..._x64e1b.png | Sujal Aryal → /manus-storage/sujal_429a0972.png |
| 1757168919_Sarjan Jung Rana.png | Sarjan Jung Rana → /manus-storage/sarjan_f1cd7225.png (previously mislabeled as Sagun!) |
| 1762074043_..._htrrznh.png | Samrat Hamal → /manus-storage/samrat_746a0552.png |

DONE: About.tsx TEAM + Home.tsx TEAM_PHOTOS fixed. Sarjan photo now correctly points to sarjan_f1cd7225.png.

### Remaining TODO
- Phase 2: redesign interior pages Services/Industries/Security/About (better contrast, less cramped)
- Phase 3: remove price range ($300–$1,200) mentions — grep for "300" / "1,200" / "1200" across client/src + fix FAQ in siteData.ts (FAQ has "$300 and $1,200" in first answer)
- Phase 4: tsc check, screenshots, checkpoint, deliver
