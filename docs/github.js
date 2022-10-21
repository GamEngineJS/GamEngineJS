// /* Declaring the variables. */
// const GITHUB_NAME_ACCOUNT = '';
// const GITHUB_FOLLOWERS_COUNT = '';
// const GITHUB_LOGO_URL = '';
// const GITHUB_BIO = '';

// /* Fetching the data from the API and storing it in the variables. */
// let profile = fetch('https://api.github.com/users/E5war5IT', {
//     mode: 'no-cors'
// });

// /* The above code is fetching the data from the API and storing it in the variables. */
// profile.then(response => {
//     if(response.ok){
//         return response.json();
//     } else {
//         info.innerHTML = 'Something went Wrong :)'
//     }
    
// }).then(data => {
//  /* Storing the data from the API in the variables. */
//     let logo = data.avatar_url;
//     let name = data.name;
//     let bio = data.bio;
//     let followers = data.followers;

//     /* Storing the data from the API in the variables. */
//     GITHUB_BIO = bio;
//     GITHUB_FOLLOWERS_COUNT = followers;
//     GITHUB_LOGO_URL = logo;
//     GITHUB_NAME_ACCOUNT = name;

//     document.querySelector('.github-bio').innerHTML = GITHUB_BIO;
// });