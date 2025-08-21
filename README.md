# Recruitment Platform

We are building a web app that organizes the application and interview process for our club into a centralized platform.

Built using [React](https://react.dev/learn), [Vite](https://vite.dev/guide/), [Typescript](https://www.typescriptlang.org/docs/), [Tailwind](https://tailwindcss.com/docs/installation/using-vite), and [Firebase](https://firebase.google.com/docs).

---

## Setup instructions

### Downloading the repository to your computer

1. Create a [GitHub Personal Access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) and store it somewhere secure.
2. Open your teminal to a directory where you want to store the project code, and clone the repository with `git clone https://github.com/gdscwm/recruitment-platform.git`. You should be prompted to enter your GitHub username and personal access token.
3. Open the newly created folder and check that its contents match the repository files.

### Installing dependencies and running the app locally

1. Check that npm is installed by running `npm -v`, if you do not see a version number output, install it: 
```
npm install -g npm
```
Additionally, make sure to have [Node.js](https://nodejs.org/en) installed as well.
2. Open a Terminal window in the `recruitment-platform` directory and run this command:
```
npm install
```
This will install the project's dependencies, and set up a number of code checks.
3. You can now start the app by running this command:
```
npm run dev
```
Your terminal should output a URL - if you enter that in your browser, you should be able to view the app.

### Configuring your environment variables

This project requires certain environment variables to be set for proper functionality.

1. Create a `.env` file by copying the provided `.env.example` file to `.env` in the root directory of this project:
    ```
    cp .env.example .env
    ```

2. Open the newly created .env file and replace the placeholder values with your actual credentials or configurations, which are stored in [Firebase](https://console.firebase.google.com/u/1/) under the club's Google account.
  
### Code style and formatting

We use ESLint + Prettier + Husky + lint-staged.

Before writing new code for the first time, take a look at the existing files in the repository to get an idea of how things are styled. In general, we are trying to follow the object-oriented programming and "don't repeat yourself" (components are your friend!) principles. Everything should be strongly typed with interfaces, components and functions should be abstracted as much as possible, and files should typically serve a single purpose (one page, one component, one class, one function).

Typescript and React (and their best practices) can sometimes be a little difficult to learn so don't stress out about this too much, it is always ok to ask questions if you're not sure.

For code formatting we use Prettier. When you make a commit, formatting should automatically run, however it is also helpful to have your IDE automatically run it on save. [Instructions for VSCode.](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code#step-2-formatting-code-on-save) [Instructions for any IntelliJ product.](https://www.jetbrains.com/help/idea/prettier.html)

Prettier should be set to run on the following file types: `**/*.{js,ts,jsx,tsx,css,scss,json,yaml,html}` - this isn't the default for some reason.

### Testing

We use Vitest + @testing-library/react for unit tests and Cypress for end-to-end tests.

To run unit tests:

```
npm test
```

## Git and version control

Git allows teams to work seamlessly on the same code. Here's a quick primer on how to use Git with our project.

All of these commands can be run in the command line. It's typically easier to create a new branch, switch between branches, commit, push, and pull from your IDE, however these commands can still come in handy at times!

### Branching

When you start to work on a ticket, CREATE A NEW BRANCH. This is making a copy of the main code that you can mess with all you want without affecting others' work. Do all your coding in your own branches, not main. You will not be able to push any code to it. The basic command is this:

`git checkout -b [branch-name]`

Name your branch `[short description]`. So, if you have a ticket where you need to update an element's styling, you would use this command: `git checkout -b update-[element]-styling`

To switch between branches, use this command:

`git switch [branch]`

If you were switching to main, for example, you would run `git switch main`.

### Adding and Committing

There's a three-step process to saving your changes with git. The first two steps are adding and committing, the third is pushing, which we'll get to in a moment. Adding and committing is like hitting save on a Word doc.

When you add files to git, you're giving git all the changes you made in all the files you worked in. (There are ways to selectively add files for git to track, too, but usually you just want to give it all your changes, which is what this command does.) Run

`git add .`

Committing essentially makes a checkpoint out of the code you just added to git. If you go into a Google Doc and hit "See previous versions", that log is super similar to a commit log. Run

`git commit -m "[short descriptive message]"`

So, if you just added some changes that created a back button on a webpage, your commit might look like `git commit -m "Create back button"`.

### Pushing and Pulling

Git keeps track of two versions of this repository: local and remote. When you write code, add it and commit it, that all happens locally on your system. The remote repository is the code you see on this site. We synchronize the local and remote repositories by pulling and pushing to them.

You pull from the remote repository to get the most recent updates into your local repository. Each time you switch to the main branch, you should run a git pull to make sure you're up to date.

`git pull`

After adding and committing changes, you push them to the remote repository to track your changes in both places. You should push each time you commit.

`git push`

The first time you run this command on a new branch, it will show you a message that your branch has no upstream branch, meaning it has no version of itself in the remote repository. It'll offer you a command to set one up. Run it. Should look like the below.
<img width="830" alt="Screenshot 2024-01-07 at 3 27 41 PM" src="https://github.com/gdscwm/ifc/assets/102433378/2aed3e0f-0fdc-493c-9956-059a83d5e2cb">

### Pull requests

When you're done with a ticket, open up a pull request for it. When you push new changes, git will prompt you to do this, or you can open one maually by visiting your branch in GitHUb. It will open up a template for you that tells you what to write. You can look at previous closed pull requests for examples.

When you open a PR, a number of automatic checks will run. You need to first make sure your code passes all of the checks - these verify that code formatting is correct, that there are no major code errors, and that the code is able to deploy to our hosting environent. Afterwards, another member of the project team will review your PR for code quality and check it for bugs. When it gets approved, you "merge" the PR into the main branch, adding the code you wrote to the repository. DO NOT merge to main without approval on your PR.

### Status

git status is a useful command to see what branch you're one, what changes have or haven't been added, if there are any remote changes that need pulling, etc.

`git status`

---

## Development Rules

### Creating a new component

Example: [https://github.com/gdscwm/sld/tree/main/frontend/src/components]

In React, source files typically go in the src directory, so you only need to specify the sub-folder(s) inside `src` you want the new component to be under.
If you do not specify a directory the new component will be placed in the `src` folder.

Create a typescript component file (`.tsx`) and a stylesheet file (`.scss`).
Both files contain a little bit of boilerplate code that will make it easier to start writing the new component.
You can look at the example components in sld, or look at the react docs: [https://react.dev/learn/your-first-component]

### Testing your new pages and components

---

If you are building a component that isn't strictly associated with a page, we want to include it in the default webpage!
For now, go to the file `src/App.tsx`. At the top, import your component. This will look something like:

```
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup.tsx";
```

Then, include your component somewhere in the HTML that is in the return statment.
Using the `ConfirmationPopup` example, this could look something like:

```
return (
    <>
      <div>
          <ConfirmationPopup/>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
     ...
```

---

If you _are_ building a page, the simplest way to test will be to go to `src/main.tsx`.
At the top, import your page. This will look something like:

```
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage.tsx";
```

Then, in the `render` function, replace `<App/>` with your page. This will look something like:

```
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfirmationPage/>
  </React.StrictMode>,
);
```

Now, refresh the [localhost:5173](localhost:5173) page, and you should see your page displayed!

**Note**: These rules will change as we build out our website, but these work just fine for starters!

### Use MUI!

[Material UI](https://mui.com/material-ui/getting-started/) is a huge library with things like buttons, text input boxes,
and nav bars you can use, as well as icons for most things, like go back or user profile. Pretty much any time you need
a small component for your webpage, you can find it in MUI. Use it, both to make your life easier, and to keep the style
of the app consistent and clean across pages.

### Helpful Links

**Learn React**: [https://react.dev/learn](https://react.dev/learn), [https://react.dev/learn/tutorial-tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe), [Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) is a bit outdated (3 years old or so), but covers the essentials very well.
