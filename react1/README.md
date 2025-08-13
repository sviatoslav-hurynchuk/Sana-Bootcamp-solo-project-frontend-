# React ToDo List Application

A modern, responsive ToDo list application built with React, TypeScript, and Redux. Features a beautiful UI with glassmorphism design, smooth animations, and support for both SQL and XML data sources.

## Features

- ✨ **Modern UI Design**: Beautiful glassmorphism interface with gradient backgrounds
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Smooth Animations**: Fade-in and slide-in animations for better user experience
- 🔄 **Data Source Support**: Switch between SQL database and XML file data sources
- 📝 **Task Management**: Create, view, and complete tasks with categories
- 🏷️ **Category System**: Organize tasks by categories
- 📅 **Due Date Support**: Set and track task due dates
- ✅ **Task Completion**: Mark tasks as completed with timestamps
- 🎯 **Real-time Updates**: Immediate UI updates using Redux state management

## Technologies Used

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit, React Redux
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── TaskForm.tsx    # Task creation form
│   └── TaskList.tsx    # Task display and management
├── store/              # Redux store configuration
│   ├── actions/        # Redux actions
│   ├── reducers/       # Redux reducers
│   └── index.ts        # Store configuration
├── api/                # API integration
│   └── graphql.ts      # GraphQL API calls
├── types/              # TypeScript type definitions
│   └── models.ts       # Data models
├── epics/              # Redux epics (if using redux-observable)
├── App.tsx             # Main application component
├── App.css             # Main stylesheet
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Creating Tasks

1. Enter a task description in the text field
2. Optionally set a due date
3. Select a category from the dropdown
4. Click "Create Task" to add the task

### Managing Tasks

- **Active Tasks**: View all incomplete tasks
- **Complete Tasks**: Click the checkmark button to mark a task as complete
- **Task Details**: See task description, due date, category, and completion status

### Switching Data Sources

Use the dropdown in the header to switch between:
- **SQL Database**: For persistent data storage
- **XML File**: For file-based data storage

## Styling Features

### Design System

- **Color Palette**: Modern gradient backgrounds with purple-blue theme
- **Typography**: Inter font family for excellent readability
- **Spacing**: Consistent spacing using CSS custom properties
- **Shadows**: Subtle shadows and glows for depth

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Animations

- **Fade In**: Smooth fade-in effect for new content
- **Slide In**: Horizontal slide-in for form sections
- **Hover Effects**: Interactive hover states for buttons and tables
- **Transitions**: Smooth transitions for all interactive elements

## Customization

### Colors

Modify the CSS custom properties in `App.css` to change the color scheme:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #198754;
  --muted-color: #6c757d;
}
```

### Typography

Change the font family by updating the `font-family` property in the body selector.

### Animations

Adjust animation timing and easing in the CSS keyframes sections.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the Inter typeface
- The React and Redux communities for excellent documentation
