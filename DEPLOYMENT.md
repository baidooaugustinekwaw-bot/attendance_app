# Deployment guide

The project is a static website with no build step.

1. Extract the ZIP.
2. Upload `index.html`, `style.css`, and `app.js` to your static hosting provider or a repository.
3. Set the project root (the folder containing `index.html`) as the publish directory.
4. Publish the site and open the public URL provided by the host.

The ZIP is prepared for deployment. A public URL cannot be created from this environment because publishing requires access to a hosting account. The app stores data locally in each browser, so this demo does not sync attendance between different devices.
