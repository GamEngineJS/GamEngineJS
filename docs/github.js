/* Fetching the data from the API and storing it in the variables. */
let profile = fetch('https://api.github.com/users/E5war5IT', {
    mode: 'no-cors'
});

profile.then(data => {
 /* Storing the data from the API in the variables. */
    let avatar = data.avatar_url;
    let name = data.name;
    let bio = data.bio;
    let followers = data.followers;
    
    GITHUB_NAME_ACCOUNT = name;
});