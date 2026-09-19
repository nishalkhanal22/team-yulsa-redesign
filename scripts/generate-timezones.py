from pathlib import Path

zone_tab = Path('/usr/share/zoneinfo/zone.tab')
output = Path('/home/ubuntu/team-yulsa-redesign/client/src/lib/timezones.ts')

def label_for(zone: str) -> str:
    parts = zone.split('/')
    place = ' / '.join(p.replace('_', ' ') for p in parts[1:]) if len(parts) > 1 else parts[0]
    return place

rows = []
for raw in zone_tab.read_text().splitlines():
    if not raw or raw.startswith('#'):
        continue
    fields = raw.split('\t')
    if len(fields) < 3:
        continue
    country_codes, _coordinates, zone = fields[:3]
    if zone.startswith(('Etc/', 'US/', 'Canada/', 'Mexico/')):
        continue
    rows.append((zone, country_codes, label_for(zone)))

rows = sorted(set(rows), key=lambda row: row[0])
lines = [
    '/* Generated from the system IANA zone.tab database. */',
    'export type TimezoneOption = { value: string; countryCodes: string; location: string };',
    '',
    'export const GLOBAL_TIMEZONES: TimezoneOption[] = [',
]
for zone, codes, location in rows:
    lines.append(f'  {{ value: {zone!r}, countryCodes: {codes!r}, location: {location!r} }},')
lines += ['];', '']
output.write_text('\n'.join(lines))
print(f'Generated {len(rows)} global timezone options at {output}')
