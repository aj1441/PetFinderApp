# PetFinderApp
README.md

# JavaScript
# Accessible Pet Finder Assignment

This repository contains a starter project for the "Pet Finder" assignment. The
HTML, CSS and JavaScript have been updated so they are readable by screen
readers such as **JAWS** while still matching the look from the original
CodePen example.

The `pet-finder` folder holds the static files you can open directly in the
browser or through the Live Server extension in VS Code. All of the styling is
already included; you will finish the JavaScript logic.

## What the page looks like

When you open `pet-finder/index.html` you should see a large heading that reads
"Let's find your perfect pet!" on top of a blue gradient background. Below the
heading is a white card containing the form:

- The gradient starts with **#d1f2eb** (a pale aqua) in the top left and fades
  to **#0e287c** (deep navy blue) in the bottom right.
- The form box is centered with rounded corners and a slight drop shadow. It has
  a translucent white background (`#ffffffcc`).
- Each label is dark slate gray (**#2e4053**). Required fields show a red
  asterisk.
- Text inputs have a light gray border (**#ccd1d1**) that turns coral
  (**#f1948a**) when focused.
- The **Submit** button is navy blue (**#0e287c**) and turns salmon
  (**#ec7063**) when you hover over it.
- Search results will appear below the form as cards with an image and details
  about each pet.

## Setting up VS Code

1. [Install Visual Studio Code](https://code.visualstudio.com/) if you have not already.
2. Launch VS Code and open the integrated terminal with `Ctrl+\`` (backtick). With JAWS running, the terminal is announced so you can type commands.
3. Install the **Live Server** extension if you would like the page to reload automatically when you save changes.
4. Run `code .` from your project directory to open the folder in VS Code.

## Forking and Cloning

1. Navigate to the GitHub page for this repository and press the **Fork** button.
2. After the fork is created, copy the SSH or HTTPS link from the **Code** dropdown.
3. In your terminal, run `git clone <repo-url>` replacing `<repo-url>` with the address you copied.
4. Change into the new project directory: `cd ajs-portfolio`.

## JavaScript Starter Code

```javascript
function getToken() {
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "ADD HERE",
      client_secret: "ADD HERE"
    })
  })
    .then((res) => res.json())
    .then((data) => data.access_token);
}

function getAdoptablePets(formData) {
  // First need to call the getToken function. Once that value is returned, 
  // you can use the token in the API call. 
  // They will have to research how to build their link.
  getToken().then((token) => {
    fetch(`ADD URL`, {
      // Note the token is being used in the header, which they will learn more about in backend.
      headers: {
        Authorization: `Bearer ${token}` // <-- add space after 'Bearer'
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
}

## Making Changes

1. Create or edit files as needed. For example, update `pet-finder/index.html` or `pet-finder/styles.css`.
2. Stage the changes with `git add <file>` or `git add .` to stage everything.
3. Commit your work with `git commit -m "Your message here"`.
4. Push the commit back to your fork using `git push origin main` (replace `main` if your branch name is different).

Once your changes are pushed, open a pull request on GitHub so your instructor can review your work.

## Running the Assignment

Open `pet-finder/index.html` in a browser to view the page. If you are using VS Code with Live Server, right-click the HTML file and choose **Open with Live Server**.

### Publishing with GitHub Pages

1. Push your completed work to GitHub.
2. In your repository, open **Settings** and choose **Pages**.
3. Select **Deploy from a branch** and pick the `main` branch with the `/root` folder.
4. GitHub will provide a link similar to `https://<username>.github.io/ajs-portfolio/pet-finder/` once the site builds.
5. Visit that link or share it with others so a screen reader can read the page online.

Happy coding!
