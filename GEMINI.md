UI Rules
1. use /images/login/Background.svg for background page
2. use /src/components/auth/FormInput.tsx for form input
3. use /src/components/auth/UploadButton.tsx for upload button
4. if using div as container, do not use rounded corners.
5. background color use #090223, border color use #05C174
6. use "font-family-audiowide" for heading and "font-family-spacemono" for body (the string is tailwind classname)
7. use #05B0C1 for title color, and #05C174 for accent color
8. when using popup modal, the background is blured and use the rule number 5 for the modal background and border
9. use flex over grid

Logic Rules
1. put server-action, components, schema, or types in the folder features/[feature_name]
2. remove unused import