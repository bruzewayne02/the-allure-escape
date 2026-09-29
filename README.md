# The Allure Escape

A massage selection app with personalized spa rituals and playful finishing touches.

Static HTML, CSS, and JavaScript. Open index.html or serve this directory.

Live site: https://bruzewayne02.github.io/the-allure-escape/ (GitHub Pages, deploys from `main`).

## Date requests

The request form on step 3 emails submissions to allure@stoneoakone.com through [Web3Forms](https://web3forms.com) (free plan).

- The Web3Forms access key is the hidden `access_key` field in `index.html`. It is public by design; the delivery address is set in the Web3Forms dashboard, not in this code.
- `app.js` submits the form with `fetch` and, once Web3Forms confirms, sends the visitor to `thanks.html`. If sending fails, an error shows under the button and they can retry.
- Email and preferred date are required; name and special requests are optional. The chosen massage, duration, pressure, and finishing touches are added as hidden fields.
- The page's Content-Security-Policy must allow `https://api.web3forms.com` for both `form-action` and `connect-src`.
- To test, submit from a browser on the live site. The free plan rejects server-side (e.g. `curl`) submissions.

Spa photo: Pixabay via Pexels — https://www.pexels.com/photo/towels-rolled-208504/
