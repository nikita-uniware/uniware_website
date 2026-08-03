# CLAUDE.md

## Source of truth

Before building or changing anything visual — colors, spacing, typography, timing, component patterns — read `Uniware_Website_Design_System_v1_3.md` first. It is the single source of truth for this repo. If a value isn't in there, don't guess it; find out where it should live and add it, or ask.

## Process rules (learned from real bugs this session)

1. **Search/inventory the whole repo before migrating or renaming anything.** Don't assume you know every place a class or value is used — grep for it first.
2. **Always show a diff before saving. Never save silently.**
3. **One change at a time, with visual confirmation in the browser before moving to the next.**
4. **Never invent a one-off value.** A size, color, or timing that doesn't match an existing documented tier must be flagged and confirmed before use, not guessed.
5. **Always check for duplicate definitions across files before assuming something is centralized.** Duplicate CSS rules — once with circle keyframes, once with the `data-reveal` rule — have caused real, hard-to-diagnose bugs this session.
