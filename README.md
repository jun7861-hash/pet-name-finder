# Pet Name Finder

A React application for browsing pet names by gender, category, and alphabet letter. Users can scroll through a paginated name list, view a random dog image, and open a details panel with the name description and related names.

## Tech stack

- **React 19** (functional components + hooks)
- **TypeScript**
- **Zustand** — global UI state
- **Vite** — dev server and production build
- **Tailwind CSS** — styling
- **Vitest** + **React Testing Library** — unit and component tests
- **ESLint** — linting

## Prerequisites

- **Node.js 18+** (tested on Node 18.19)
- **npm** 10+

## Setup

```bash
# Clone the repository
git clone <repository-url>
cd pet-name-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## How to use the app

1. Choose a **gender** (Male, Female, or Both).
2. Optionally open a **category filter** tab and check sub-categories.
3. Select a letter in the **A–Z alphabet bar** to load names.
4. Browse names with the vertical picker (click a name or use the arrows).
5. Click the **dog image** to open additional details (description and related names).

## Architecture

### High-level flow

```
User interaction
       ↓
Zustand store (gender, letter, filters)
       ↓
namesApi.fetchNames()  ← simulated API with pagination
       ↓
filterNames()          ← pure filtering + sorting
       ↓
NamePicker / AdditionalDetails
```

### Folder structure

```
src/
├── api/              # Simulated API (pagination, delay)
├── components/
│   ├── header/       # Gender selection + category filters
│   ├── content/      # Hero, name results, details panel
│   ├── names/        # Name picker + random dog image
│   ├── search/       # Alphabet filter
│   └── icons/        # Shared SVG icons
├── constants/        # Filter and alphabet config
├── hooks/            # usePaginatedNames, useRandomDogImage
├── mock/             # JSON data (names, categories, letters)
├── store/            # Zustand global state
├── types/            # Shared TypeScript types
└── utils/            # Pure business logic (filter, details, categories)
```

### State management

Global UI state lives in `src/store/usePetNameStore.ts`:

| State | Purpose |
|-------|---------|
| `gender` | Male / Female / Both filter |
| `selectedLetter` | Active alphabet letter (null = default hero) |
| `openFilter` | Currently expanded filter tab |
| `selectedCategoryIds` | Checked category checkboxes |

Presentational components (e.g. `GenderSection`, `NamePicker`, `FilterDropdown`) receive props. Connected components (`Header`, `FiltersSection`, `PetNamesContent`) read from the store.

Local component state handles UI that does not need to be global:

- Selected name index in the picker
- Whether the details panel is open
- Pagination loading state in `usePaginatedNames`

### Data layer

- **Mock data** — `src/mock/names.json`, `categories.json`, `letters.json`
- **Filtering** — `src/utils/filterNames.ts` filters by letter, gender, and categories, then sorts A–Z
- **API simulation** — `src/api/namesApi.ts` applies a 400 ms delay and returns 20 names per page
- **Lazy loading** — `NamePicker` requests the next page when the user scrolls within 3 names of the end

### Key components

| Component | Responsibility |
|-----------|----------------|
| `GenderSection` | Gender toggle buttons |
| `FiltersSection` | Expandable category filter bar + checkbox sub-options |
| `AlphabetFilter` | A–Z letter selection |
| `NamePicker` | Vertical scrollable name list with prev/next controls |
| `RandomDogImage` | Fetches a random dog photo from [Dog CEO API](https://dog.ceo/dog-api/) |
| `AdditionalDetails` | Description, related names, category label |

### Testing

Tests live next to the code they cover:

- `usePetNameStore.test.ts` — store actions
- `GenderSection.test.tsx`, `NamePicker.test.tsx`, `FilterDropdown.test.tsx` — component behavior

Run with `npm test`.

## Assumptions

### Data and API

- Names, categories, and letters come from local JSON files, not a real backend.
- `namesApi.ts` simulates network latency (400 ms) and paginates results client-side after filtering the full dataset.
- Name lookup by title (`getNameByTitle`) assumes titles are unique. Duplicate titles would return the first match.

### Filtering behavior

- **Gender** and **category** filters apply when a letter is selected and names are loaded. The default hero screen (no letter) ignores them.
- **Category filters** use OR logic: a name matches if it belongs to any selected category.
- With no categories checked, all names for the current letter and gender are shown.
- Names are always sorted alphabetically (A–Z) after filtering.

### UX and interaction

- Additional details are revealed by **clicking the dog image**, matching the provided design flow.
- The details panel stays open while browsing names; it updates as the selected name changes.
- Selecting a new letter or changing filters resets the selected name and closes the details panel.
- Share buttons in the details panel are UI-only (no copy or social share implementation).
- The alphabet filter selects a letter but does not toggle back to the default hero; refreshing the page returns to the initial state.

### Related names

- Related names share at least one category with the current name and start with the same letter.
- Up to three related names are shown.

### Styling and layout

- Colors, typography, and spacing follow the provided design tokens (cream background, red accent `#E81C24`, Roboto Slab + Roboto).
- Layout is optimized for **desktop**. Tablet and smaller breakpoints are not fully tuned (fixed widths, horizontal filter bar).

### External services

- Random dog images require network access to `dog.ceo`. If the request fails, a fallback message is shown instead of the image.

### Performance

- **Pagination** (20 names per page) is used instead of virtualized lists. The name picker only renders seven visible slots at a time, which keeps the DOM small even as pages load.

## License

Private — assignment project.
