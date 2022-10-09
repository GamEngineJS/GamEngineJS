let profile = fetch('https://api.github.com/users/E5war5IT', {
    mode: 'no-cors'
});

profile.then(response => {
    if(response.ok){
        return response.json();
    } else {
        info.innerHTML = 'Something went Wrong :)'
    }
}).then(data => {
 let avatar = data.avatar_url;
 let name = data.name;
 let bio = data.bio;
 let followers = data.followers;
});