# Task Manager Pro

Full-stack task manager: React (Create React App) client, Firebase Auth for
accounts, Cloud Firestore for realtime task storage, and a Cloud Function that
writes a welcome task when a user signs up. The app lives in
`task-manager-pro/`; the repository name (`personal-portfolio`) predates this
being its only content — renaming it to `task-manager-pro` is proposed, not
done.

## What the code actually does (verified against source)

- **Auth**: email/password signup & login (`client/src/context/AuthContext.js`
  listens to `onAuthStateChanged`); Firebase handles session persistence.
  Routes outside `/login`/`/signup` render only when a user object exists.
- **Tasks**: create / complete-pending toggle / inline edit / delete
  (`TaskForm.js`, `TaskItem.js`); lists subscribe with `onSnapshot`, so two
  open tabs update without refresh (`TaskList.js`).
- **Isolation**: every query filters `userId == currentUser.uid`, and
  `firestore.rules` enforce the same check server-side (read, create, update,
  delete are UID-bound). A user cannot enumerate another user's tasks.
- **Filters**: All / Pending / Completed buttons switch the Firestore query;
  the status-filtered variant needs the composite index declared in
  `firestore.indexes.json` — deploy it (see DEPLOYMENT.md).
- **Welcome task**: `functions/index.js` (`addWelcomeTask`, auth trigger) adds
  one pending task on user creation.
- **UI**: Framer Motion route transitions, React Router v7, plain CSS.

Stack versions per `client/package.json`: React 19.2, Firebase JS SDK 12,
Framer Motion 12, Router 7; functions use firebase-functions v5 (Node 18
runtime declared — deprecated upstream, see Maintenance notes).

## Run locally

Requires your own Firebase project (Auth with Email/Password enabled, one
Firestore database). The Firebase web config values are build-time public,
but nothing runs without a project you own.

```bash
cd task-manager-pro/client
npm install
cp .env.example .env.local     # fill in your project's config values
npm start                      # http://localhost:3000
```

Deploy is out of scope for a local evaluation; see
[DEPLOYMENT.md](task-manager-pro/DEPLOYMENT.md) for hosting, functions,
rules and index deployment.

## Project structure

```
task-manager-pro/
├── client/                 # CRA React app (public/, src/components, src/pages)
│   └── src/firebase.js     # config from env vars; throws if unconfigured
├── functions/index.js      # addWelcomeTask auth trigger
├── firestore.rules         # per-document UID isolation
├── firestore.indexes.json  # userId+status+createdAt composite index
├── firebase.json           # hosting (client/build) + functions config
└── DEPLOYMENT.md
```

## Maintenance notes (not fixed in this pass)

- No test files exist despite @testing-library being installed; no CI.
- Cloud Functions declare Node 18, which Google has deprecated for deploys;
  bump `engines.node` and re-test when touching functions.
- Functions use the 1st-gen `firebase-functions` API; it works with v5 but
  2nd-gen (`onCreate` from `firebase-functions/v2/auth`) is the forward path.
- `firestore.rules` have no explicit deny-all default outside the `tasks`
  match block (Firestore denies by default, so behavior is correct, just
  implicit).
- React Scripts 5 is the maintenance end of CRA; ejecting or migrating to
  Vite is a deliberate future step, not a bug.

## License

MIT — see [LICENSE](LICENSE).
