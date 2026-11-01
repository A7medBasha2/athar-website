# Athar website update

The landing page now includes a responsive gallery of actual app screenshots in premium black-and-gold mobile mockups. The gallery uses the four Postimages direct links supplied by the user plus two screenshots attached in the conversation, stored locally under `assets/`.

Deploy by replacing the repository files with this package and committing to the main branch. Keep the existing release pipeline updating `website-latest.json` as before. The existing APK download logic and privacy page are preserved.

External Postimages assets require internet access. Static checks do not replace testing the deployed website on real desktop and mobile browsers.
