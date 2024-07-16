# Project Checklist Extension

This is a simple Chrome extension that allows you to create and manage a checklist directly from your browser. It helps you stay organized by letting you add, delete, and restore tasks easily.

## Features

- **Add tasks:** Quickly add new tasks to your checklist.
- **Delete tasks:** Remove tasks that are no longer needed.
- **Restore tasks:** Restore the last deleted task with a single click.

## Installation

To install and use the Checklist extension:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/SimpleCyber/Task-CheckList.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by clicking the toggle switch in the top right corner.

4. Click the "Load unpacked" button and select the folder where you cloned the repository.

5. The Checklist extension should now appear in your list of installed extensions.

## Usage

1. Click on the Checklist extension icon in the Chrome toolbar to open the popup.
2. In the popup window, you can:
   - **Add new tasks:** Type a task in the input field at the bottom and click the "Add" button.
   - **Delete tasks:** Click the task you want to delete from the list.
   - **Restore tasks:** Click the ♻️ button to restore the last deleted task.

## File Structure

- `popup.html`: The HTML file for the extension's popup interface.
- `popup.css`: The CSS file for styling the popup.
- `popup.js`: The JavaScript file that handles the extension's functionality.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
