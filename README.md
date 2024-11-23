# Task Manager App (vanilla js)

A simple and intuitive task management application built with the classic holy trinity html, js & css. This app provides tabs to organize tasks into All Tasks, Active Tasks, and Completed Tasks, automatically sorted by the newest first.

## Features

- 📝 **Task Management**: Add, edit, delete, and mark tasks as completed.
- 📂 **Organization**: View tasks in Active & Completed format.
- 🔄 **Storage**: Uses the brower local storage to read, add, edit & delete tasks.
- 🎨 **Modern Design**: Styled with CSS.

## Technologies Used

- **HTML**: For structuring the application.
- **CSS**: For styling and layout.
- **JavaScript**: For adding dynamic behavior and functionality.

### Prerequisites

- Node.js (v16 or higher)
- npm only

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mohamed-kamel91/Todo-App-Vanilla.git
   cd todo-App-Vanilla
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**
   ```
   npm run serve
   ```
   The app will be accessible at [http://localhost:5000](http://localhost:5000).

## Project Structure

Most of the code lives in the `src` folder and looks something like this:

```sh
src
|
+-- Scripts         # JavaScript logic
|
+-- Styles          # styles for the whole app
```

Scripts could have the following structure:

```sh
src/scripts/specific-script-folder
|
+-- classes         # Classes for task-related logic
|
+-- components      # UI-related JS components
|
+-- constants       # Constants used across the app
|
+-- utils           # Helper utility functions
```

## Scripts

- `npm run serve`: Start the app with live-server in development mode.
