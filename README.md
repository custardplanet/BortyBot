# Installation Instructions
1. Follow PhantomBot installation instructions
2. In this repository, click the "Code" button, and select "Download ZIP"
3. Extract the `BortyBot-master` directory from the zip
4. Rename the `BortyBot-master` directory to `bortybot`
5. Move the `bortybot` directory into the PhantomBot `scripts` directory
6. Edit the `ranksSystem.js` and replace the `resolveRank` function with the following
```
    function resolveRank(username) {
        return ($.username.hasUser(username) == true ? $.username.get(username) : username).trim();
    }
```
