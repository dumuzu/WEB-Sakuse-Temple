# 京都さんぽ — design direction

Profile: retro-japanese-homepage@1. Genre: personal travel journal.
Primary aesthetic skill: Hallmark, following the user's explicit early-web direction.
Content macrostructure: Long Document. Navigation: side directory. Footer: compact colophon.

Use the existing vanilla HTML/CSS and optional JavaScript. Keep every route and interaction.
The visual reference is a Japanese personal homepage around 2000: a centered paper page,
double-rule masthead, compact side directory, underlined blue links, photograph captions,
small update log, and square native-looking controls. No fabricated visitor counter.

Typography: Yu Mincho / serif for the site name; Meiryo / sans-serif for readable Japanese.
Color tokens live in public/assets/style.css. Paper, dark brown ink, burgundy headings,
blue links. No gradient hero, oversized English slogans, pills, floating navigation,
repeated marketing cards, animations, fake browser chrome, or neon effects.

Photos remain ordinary images with real author credits. Buttons show clear focus and
pressed states. The basic version loads no JavaScript. The same design applies to the
practice version, whose interactive controls are progressively enabled.

Review: inspect desktop and widths 320/375/414/768, verify links/images and each JS function,
check keyboard focus and no-JS behavior, then check the production pages without login.
