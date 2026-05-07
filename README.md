# Mémoire Community Notes

Community Mémoire Notes are markdown skill packs that improve how agents design, research, code, review, and operate local workflows.

## Structure

Each package lives at `notes/<note-name>/` and contains:

- `note.json` with Mémoire Note metadata
- one or more markdown skill files referenced by `note.json`
- optional resources that are never executed during install

## Review Rules

Community Notes must include source URLs, `lastResearchedAt`, `freshnessDays`, safe relative file paths, and markdown skill files. Installs do not run scripts from downloaded archives.

Run validation from the Mémoire repo:

```bash
MEMOIRE_COMMUNITY_NOTES_ROOT="$PWD" npm --prefix ../ark run check:community-notes
```

## Submit

Fork this repo, add or update a folder in `notes/`, run validation, and open a pull request. Approved Notes are packaged into the `https://www.memoire.cv/notes/community/catalog.v1.json` marketplace catalog.
